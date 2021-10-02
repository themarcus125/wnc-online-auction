import { request, RequestHandler } from 'express';
import UserService from '@/user/user.service';
import { RegisterDTO } from '@/auth/auth.dto';
import { RequestStatus } from '@/upgradeRequest/upgradeRequest.schema';
import UpgradeRequestService from '@/upgradeRequest/upgradeRequest.service';
import { UserDoc, UserRole } from '@/user/user.schema';

const createAdmin: RequestHandler = async (req, res, next) => {
  try {
    const { email, name, address, password }: RegisterDTO = req.body;
    const admin = await UserService.createAdmin({
      email,
      name,
      address,
      password,
    });
    if (!admin) {
      throw new Error('Something went wrong');
    }
    res.json({ id: admin._id });
  } catch (e) {
    next(e);
  }
};

export const getPendingRequest: RequestHandler = async (req, res, next) => {
  try {
    const pendingRequest = await UpgradeRequestService.find({
      status: RequestStatus.PENDING,
    }).populate('user', '-password -verifyOtp -passwordOtp');
    const notExpiredRequest = pendingRequest.filter((r) => {
      const isExpired = UpgradeRequestService.isExpired(r);
      return !isExpired;
    });
    res.json(notExpiredRequest);
  } catch (e) {
    next(e);
  }
};

export const changeRequestStatus =
  (mode: boolean): RequestHandler =>
  async (req, res, next) => {
    try {
      const requestId = req.params.requestId;
      const request = await UpgradeRequestService.findById(requestId).populate(
        'user',
      );
      if (!request) {
        return res.status(404).json({
          error: 'NOT_FOUND',
        });
      }
      if (request.status !== RequestStatus.PENDING) {
        return res.status(400).json({
          error: 'FORBIDDEN',
        });
      }
      const admin: UserDoc = res.locals.user;
      const status = mode ? RequestStatus.APPROVED : RequestStatus.REJECTED;
      if (mode) {
        const user: UserDoc = request.user;
        user.role = UserRole.SELLER;
        await user.save();
      }
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
  createAdmin,
  changeRequestStatus,
  getPendingRequest,
};
