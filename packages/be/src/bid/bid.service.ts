import RepositoryService, { ModeQuery } from '@/db/repository.service';
import { sendMail } from '@/mail/mail.service';
import { ProductDoc, ProductStatus } from '@/product/product.schema';
import RatingService from '@/rating/rating.service';
import { excludeString, UserDoc } from '@/user/user.schema';
import { tag } from '@/utils/html';
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
    return this.model.exists({
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
    if (status !== ProductStatus.NORMAL) {
      return false;
    }
    if (expiredAt.getTime() < Date.now()) {
      return false;
    }
    if (!buyPrice) {
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
    if (seller._id === bidder._id) {
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
  ) {
    // C
    // N  (
    if (!currentBid) return true;
    // C (
    // N   (
    if (!currentBid.maxAutoPrice) return true;
    // C ()
    // N   (
    if (currentBid.maxAutoPrice < newBid.price) return true;
    if (newBid.maxAutoPrice) {
      // C (     )
      // N   ( -->(  )
      if (newBid.maxAutoPrice > currentBid.maxAutoPrice) {
        return true;
      }
      // C ( ---->( )
      // N   ( )
      return false;
    }
    // C ( -->(   )
    // N   (
    return false;
  }

  checkBidderRejected(bidder: string, product: string) {
    return this.model.exists({
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
      `${bidProduct.name} - ${bidProduct._id} - ${bid.price}`,
    );
    const emails = [seller.email, bidder.email];
    if (prevBidder) {
      emails.push(prevBidder.email);
    }
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
