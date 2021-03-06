import RepositoryService, { ModeQuery } from '@/db/repository.service';
import { sendMail } from '@/mail/mail.service';
import { ProductDoc, ProductStatus } from '@/product/product.schema';
import ProductService from '@/product/product.service';
import RatingService from '@/rating/rating.service';
import { excludeString, UserDoc } from '@/user/user.schema';
import UserService from '@/user/user.service';
import { anchorNewTab, tag } from '@/utils/html';
import { ClientSession } from 'mongoose';
import { CreateBidDTO, QueryBidDTO } from './bid.dto';
import { BidDoc, BidModel, BidStatus } from './bid.schema';

class BidService
  extends RepositoryService<BidDoc, CreateBidDTO>
  implements ModeQuery<BidDoc, QueryBidDTO>
{
  constructor() {
    super(BidModel);
  }

  currentBid(product: ProductDoc) {
    return this.findOne({
      product: product._id,
      bidder: product.currentBidder,
      price: product.currentPrice,
      status: BidStatus.NORMAL,
    }).sort({ _id: -1 });
  }

  checkPriceExists(price: number, product: ProductDoc) {
    return this.getModel().exists({
      product: product._id,
      price,
      status: BidStatus.NORMAL,
    });
  }

  async checkRating({ onlyRatedBidder }: ProductDoc, bidder: UserDoc) {
    const [score, pos] = await RatingService.countScore(bidder._id);
    if (!onlyRatedBidder && score === 0) return true;
    return pos / score >= 0.8;
  }

  productCanPlaceBid({ status, expiredAt }: ProductDoc) {
    if (status !== ProductStatus.NORMAL) {
      return false;
    }
    if (expiredAt.getTime() < Date.now()) {
      return false;
    }
    return true;
  }

  checkStepPrice(
    stepPrice: number,
    currentPrice: number,
    price: number,
    maxAutoPrice?: number,
  ) {
    if ((price - currentPrice) % stepPrice !== 0) {
      return false;
    }
    if (maxAutoPrice && (maxAutoPrice - currentPrice) % stepPrice !== 0) {
      return false;
    }
    return true;
  }

  async productCanBuyNow(product: ProductDoc, currentBid: BidDoc | null) {
    const { status, expiredAt, currentPrice, buyPrice } = product;
    if (!buyPrice) {
      return false;
    }
    if (status !== ProductStatus.NORMAL) {
      return false;
    }
    if (expiredAt.getTime() < Date.now()) {
      return false;
    }
    if (currentPrice >= buyPrice) {
      return false;
    }
    if (!currentBid) return true;
    if (currentBid.maxAutoPrice && currentBid.maxAutoPrice >= buyPrice)
      return false;
    return true;
  }

  async checkCanPlaceBid(
    product: ProductDoc,
    bidder: UserDoc,
    { price, maxAutoPrice }: CreateBidDTO,
  ) {
    const { seller, currentPrice } = product;
    if (seller._id.toString() === bidder._id.toString()) {
      return false;
    }
    if (currentPrice > price) {
      return false;
    }
    if (
      !this.checkStepPrice(
        product.stepPrice,
        product.currentPrice,
        price,
        maxAutoPrice,
      )
    ) {
      return false;
    }
    if (!(await this.checkRating(product, bidder))) {
      return false;
    }
    if (await this.checkPriceExists(price, product)) {
      return false;
    }
    return true;
  }

  async autoBidHandler(
    product: ProductDoc,
    currentBid: BidDoc | null,
    newBid: BidDoc,
    session: ClientSession,
  ): Promise<[boolean, ProductDoc | null, BidDoc | null]> {
    // C
    // N  (
    if (!currentBid) return [true, null, null];
    // C (
    // N   (
    if (!currentBid.maxAutoPrice) return [true, null, null];
    // C ()
    // N   (
    if (currentBid.maxAutoPrice < newBid.price) return [true, null, null];
    if (newBid.maxAutoPrice) {
      // C (     )
      // N   ( -->(  )
      if (newBid.maxAutoPrice > currentBid.maxAutoPrice) {
        const autoPrice = currentBid.maxAutoPrice + product.stepPrice;
        const autoBid = (
          await this.getModel().create(
            [
              {
                product: product._id,
                bidder: newBid.bidder,
                price: autoPrice,
                maxAutoPrice: newBid.maxAutoPrice,
              },
            ],
            { session },
          )
        )[0];
        if (!autoBid) throw new Error('AUTO_BID_N');
        const updatedProduct = await ProductService.getModel()
          .findByIdAndUpdate(
            product._id,
            {
              $inc: {
                bidCount: 1,
              },
              currentPrice: autoBid.price,
              currentBidder: autoBid.bidder,
            },
            { returnOriginal: false },
          )
          .populate('currentBidder', excludeString)
          .populate('seller', excludeString)
          .session(session);
        if (!updatedProduct) throw new Error('AUTO_BID_PRODUCT_N');
        return [true, updatedProduct, autoBid];
      }
      // C ( ---->( )
      // N   ( )
      const autoPrice = newBid.maxAutoPrice + product.stepPrice;
      const autoBid = (
        await this.getModel().create(
          [
            {
              product: product._id,
              bidder: currentBid.bidder,
              price: autoPrice,
              maxAutoPrice: currentBid.maxAutoPrice,
            },
          ],
          { session },
        )
      )[0];
      if (!autoBid) throw new Error('AUTO_BID_C_1');
      const updatedProduct = await ProductService.getModel()
        .findByIdAndUpdate(
          product._id,
          {
            $inc: {
              bidCount: 1,
            },
            currentPrice: autoBid.price,
            currentBidder: autoBid.bidder,
          },
          {
            returnOriginal: false,
          },
        )
        .populate('currentBidder', excludeString)
        .populate('seller', excludeString)
        .session(session);
      if (!updatedProduct) throw new Error('AUTO_BID_PRODUCT_C_1');
      return [false, updatedProduct, autoBid];
    }
    // C ( -->(   )
    // N   (
    const autoPrice = newBid.price + product.stepPrice;
    const autoBid = (
      await this.getModel().create(
        [
          {
            product: product._id,
            bidder: currentBid.bidder,
            price: autoPrice,
            maxAutoPrice: currentBid.maxAutoPrice,
          },
        ],
        { session },
      )
    )[0];
    if (!autoBid) throw new Error('AUTO_BID_C_2');
    const updatedProduct = await ProductService.getModel()
      .findByIdAndUpdate(
        product._id,
        {
          $inc: {
            bidCount: 1,
          },
          currentPrice: autoBid.price,
          currentBidder: autoBid.bidder,
        },
        { returnOriginal: false },
      )
      .populate('currentBidder', excludeString)
      .populate('seller', excludeString)
      .session(session);
    if (!updatedProduct) throw new Error('AUTO_BID_PRODUCT_C_2');
    return [false, updatedProduct, autoBid];
  }

  checkBidderRejected(bidder: string, product: string) {
    return this.getModel().exists({
      bidder,
      product,
      status: BidStatus.REJECTED,
    });
  }

  async sendPlaceBidEmail(
    bid: BidDoc,
    bidProduct: ProductDoc,
    seller: UserDoc,
    bidder: UserDoc,
    prevBidder?: UserDoc | null,
  ) {
    const subject = `${bidProduct.name} has just been placed a new bid`;
    const content = tag(
      'h2',
      `${anchorNewTab(
        ProductService.productClientLink(bidProduct._id),
        bidProduct.name,
      )} has a new bid`,
    );
    const emails = [seller.email, bidder.email];
    if (prevBidder) {
      emails.push(prevBidder.email);
    }
    return sendMail(emails, subject, content);
  }

  async sendRejectMail(bidderId: string, product: ProductDoc) {
    const bidder = await UserService.findById(bidderId);
    if (!bidder) return null;
    const subject = `Your bid has been rejected`;
    const content = tag(
      `h2`,
      `Your bids in ${anchorNewTab(
        ProductService.productClientLink(product._id),
        product.name,
      )} has beed rejected by the seller`,
    );
    const emails = [bidder.email];
    return sendMail(emails, subject, content);
  }

  async sendBuyNowMail(
    bidder: UserDoc,
    product: ProductDoc,
    currentBid: BidDoc | null,
  ) {
    const seller = await UserService.findById(product.seller);
    if (!seller) return null;
    const emails = [bidder.email, seller.email];
    if (currentBid) {
      const currentBidder = await UserService.findById(currentBid.bidder);
      if (currentBidder) {
        emails.push(currentBidder.email);
      }
    }
    const subject = `Your product has been sold`;
    const content = tag(
      'h2',
      `${anchorNewTab(
        ProductService.productClientLink(product._id),
        product.name,
      )} has been sold`,
    );
    return sendMail(emails, subject, content);
  }

  async modeFind(
    mode = '',
    { product, bidder }: QueryBidDTO = {},
  ): Promise<any> {
    if (mode === 'history') {
      return this.find({
        product,
        status: BidStatus.NORMAL,
      }).populate('bidder', excludeString);
    }
    if (mode === 'sellerHistory') {
      return this.find({
        product,
      }).populate('bidder', excludeString);
    }
    if (mode === 'bidderHistory') {
      return this.find({
        product,
        bidder,
      }).populate('bidder', excludeString);
    }
    return this.find({});
  }
}

export default new BidService();
