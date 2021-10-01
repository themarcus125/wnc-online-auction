import { UserDoc } from '@/user/user.schema';
import { RequestHandler } from 'express';
import { RequestStatus } from './upgradeRequest.schema';
import UpgradeRequestService from './upgradeRequest.service';

export const createRequest: RequestHandler = async (req, res, next) => {
  try {
    const user: UserDoc = res.locals.user;
    const canRequest = await UpgradeRequestService.canRequest(user);
    if (!canRequest) {
      return res.status(400).json({
        error: 'FORBIDDEN',
      });
    }
    const request = await UpgradeRequestService.create({ user: user._id });
    if (!request) {
      return res.status(500).json({
        error: 'SOMETHING_WENT_WRONG',
      });
    }
    res.json({
      status: 'OK',
    });
  } catch (e) {
    next(e);
  }
};

export const changeRequestStatus =
  (mode: boolean): RequestHandler =>
  async (req, res, next) => {
    try {
      const requestId = req.params.requestId;
      const request = await UpgradeRequestService.findById(requestId);
      if (!request) {
        return res.status(404).json({
          error: 'NOT_FOUND',
        });
      }
      const isPending = UpgradeRequestService.isPending(request);
      if (!isPending) {
        return res.status(400).json({
          error: 'FORBIDDEN',
        });
      }
      const admin: UserDoc = res.locals.user;
      const status = mode ? RequestStatus.APPROVED : RequestStatus.REJECTED;
      request.status = status;
      request.approver = admin._id;
      await request.save();
      res.json({
        status,
      });
    } catch (e) {
      next(e);
    }
  };

export default {
  createRequest,
  changeRequestStatus,
};
