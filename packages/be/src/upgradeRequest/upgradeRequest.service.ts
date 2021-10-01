import { UserDoc, UserRole } from '@/user/user.schema';
import BaseService from '@/utils/base.service';
import { CreateRequestDTO } from './upgradeRequest.dto';
import {
  RequestStatus,
  UpgradeRequestDoc,
  UpgradeRequestModel,
} from './upgradeRequest.schema';

class CategoryService extends BaseService<UpgradeRequestDoc, CreateRequestDTO> {
  constructor() {
    super(UpgradeRequestModel);
  }
  async canRequest(user: UserDoc) {
    if (user.role !== UserRole.BIDDER) return false;
    const requests = await this.find({
      user: user._id,
    }).sort({ createdAt: 1 });
    if (!requests.length) return false;
    return this.isPending(requests[0]);
  }
  isPending({ status, createdAt, expiredIn }: UpgradeRequestDoc) {
    if (status !== RequestStatus.PENDING) return false;
    const isExpired =
      Date.now() - new Date(createdAt).getTime() - expiredIn * 1000 > 0;
    if (!isExpired) return false;
    return true;
  }
}

export default new CategoryService();
