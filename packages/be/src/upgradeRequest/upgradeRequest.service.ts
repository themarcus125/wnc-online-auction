import { UserDoc, UserRole } from '@/user/user.schema';
import RepositoryService from '@/db/repository.service';
import { CreateRequestDTO } from './upgradeRequest.dto';
import {
  RequestStatus,
  UpgradeRequestDoc,
  UpgradeRequestModel,
} from './upgradeRequest.schema';

class UpgradeRequestService extends RepositoryService<
  UpgradeRequestDoc,
  CreateRequestDTO
> {
  constructor() {
    super(UpgradeRequestModel);
  }
  async canRequest(user: UserDoc, lastedRequest?: UpgradeRequestDoc) {
    if (user.role !== UserRole.BIDDER) return false;
    if (!user.isVerified) return false;
    const request =
      lastedRequest !== undefined
        ? lastedRequest
        : await this.findOne({
            user: user._id,
          }).sort({ _id: -1 });
    return this.canRequestWithLastestRequest(request);
  }
  canRequestWithLastestRequest(request: UpgradeRequestDoc | null | undefined) {
    if (!request) return true;
    if (request.status !== RequestStatus.PENDING) return true;
    return this.isExpired(request);
  }
  isExpired({ createdAt, expiredIn }: UpgradeRequestDoc) {
    const isExpired =
      Date.now() - new Date(createdAt).getTime() - expiredIn * 1000 >= 0;
    return isExpired;
  }
}

export default new UpgradeRequestService();
