import RepositoryService, { ModeQuery } from '@/db/repository.service';
import { sendMail } from '@/mail/mail.service';
import { ProductDoc, ProductStatus } from '@/product/product.schema';
import RatingService from '@/rating/rating.service';
import { excludeString, UserDoc } from '@/user/user.schema';
import { tag } from '@/utils/html';
import { CreateBidDTO, QueryBidDTO } from './bid.dto';
import { CheckBidMessage } from './bid.message';
import { BidDoc, BidModel, BidStatus } from './bid.schema';

class BidService
  extends RepositoryService<BidDoc, CreateBidDTO>
  implements ModeQuery<BidDoc, QueryBidDTO>
{
  constructor() {
    super(BidModel);
  }

  async checkRating({ onlyRatedBidder }: ProductDoc, bidder: UserDoc) {
    const [score, pos] = await RatingService.countScore(bidder._id);
    if (!onlyRatedBidder && score === 0) return true;
    return pos / score >= 0.8;
  }

  async productCanPlaceBid({ status, expiredAt }: ProductDoc) {
    if (status !== ProductStatus.NORMAL) {
      return false;
    }
    if (expiredAt.getTime() < Date.now()) {
      return false;
    }
    return true;
  }

  async checkCanPlaceBid(
    product: ProductDoc,
    bidder: UserDoc,
    { price, maxAutoPrice }: CreateBidDTO,
  ) {
    const { seller, currentPrice, stepPrice } = product;
    if (seller._id === bidder._id) {
      return CheckBidMessage.BIDDER_IS_SELLER;
    }
    if (!(await this.checkRating(product, bidder))) {
      return CheckBidMessage.RATING;
    }
    if (currentPrice + stepPrice > price) {
      return CheckBidMessage.PRICE;
    }
    return CheckBidMessage.VALID;
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
