import RepositoryService from '@/db/repository.service';
import { ProductDoc, ProductStatus } from '@/product/product.schema';
import { UserDoc } from '@/user/user.schema';
import { CreateBidDTO } from './bid.dto';
import { CheckBidMessage } from './bid.message';
import { BidDoc, BidModel } from './bid.schema';

class BidService extends RepositoryService<BidDoc, CreateBidDTO> {
  constructor() {
    super(BidModel);
  }

  async productCanBid({ status, expiredAt }: ProductDoc) {
    if (status !== ProductStatus.NORMAL) {
      return false;
    }
    if (expiredAt.getTime() < Date.now()) {
      return false;
    }
    return true;
  }

  async checkBid(
    { seller, allowNoRatingBid, currentPrice, stepPrice }: ProductDoc,
    bidder: UserDoc,
    { price, maxAutoPrice }: CreateBidDTO,
  ) {
    if (seller === bidder._id) {
      return CheckBidMessage.BIDDER_IS_SELLER;
    }
    if (!allowNoRatingBid) {
      return CheckBidMessage.NO_RATING_BIDDER;
    }
    if (currentPrice + stepPrice > price) {
      return CheckBidMessage.PRICE;
    }
    return CheckBidMessage.VALID;
  }
}

export default new BidService();
