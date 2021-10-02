import { UserDoc, UserRole } from '@/user/user.schema';
import BaseService from '@/utils/base.service';
import { CreateRequestDTO } from './upgradeRequest.dto';
import {
  RequestStatus,
  UpgradeRequestDoc,
  UpgradeRequestModel,
} from './upgradeRequest.schema';

class UpgradeRequestService extends BaseService<
  UpgradeRequestDoc,
  CreateRequestDTO
> {
  constructor() {
    super(UpgradeRequestModel);
  }
  async canRequest(user: UserDoc) {
    if (user.role !== UserRole.BIDDER) return false;
    if (!user.isVerified) return false;
    const requests = await this.find({
      user: user._id,
    }).sort({ createdAt: 1 });
    if (!requests.length) return true;
    if (requests[0].status !== RequestStatus.PENDING) return true;
    return this.isExpired(requests[0]);
  }
  isExpired({ createdAt, expiredIn }: UpgradeRequestDoc) {
    const isExpired =
      Date.now() - new Date(createdAt).getTime() - expiredIn * 1000 >= 0;
    return isExpired;
  }
}

export default new UpgradeRequestService();
