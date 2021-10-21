import { RequestHandler } from 'express';
import UserService from '@/user/user.service';
import AuthService from '@/auth/auth.service';
import { RegisterDTO } from '@/auth/auth.dto';
import { RequestStatus } from '@/upgradeRequest/upgradeRequest.schema';
import UpgradeRequestService from '@/upgradeRequest/upgradeRequest.service';
import { UserDoc, UserRole } from '@/user/user.schema';
import { AdminUpdateUserDTO } from './admin.dto';
import ProductService from '@/product/product.service';

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

const getPendingRequest: RequestHandler = async (req, res, next) => {
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

const changeRequestStatus =
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

const getUser: RequestHandler = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const user = await UserService.findById(userId).select(
      '-password -verifyOtp -passwordOtp',
    );
    res.json(user);
  } catch (e) {
    next(e);
  }
};

const getUsers: RequestHandler = async (req, res, next) => {
  try {
    const users = await UserService.find({
      $or: [{ role: UserRole.BIDDER }, { role: UserRole.SELLER }],
    })
      .select('-password -verifyOtp -passwordOtp')
      .sort({ role: 1 });
    res.json(users);
  } catch (e) {
    next(e);
  }
};

const createUser: RequestHandler = async (req, res, next) => {
  try {
    const { email, name, address, password }: RegisterDTO = req.body;
    const user = await AuthService.register({
      email,
      name,
      address,
      password,
    });
    res.json({
      id: user._id,
      email: user.email,
      name: user.name,
      address: user.address,
    });
  } catch (e) {
    next(e);
  }
};

const updateUser: RequestHandler = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { email, address, dob, role, name, isVerified }: AdminUpdateUserDTO =
      req.body;
    const user = await UserService.findOneAndUpdate(
      { _id: userId },
      {
        email,
        address,
        dob,
        role,
        name,
        isVerified,
      },
    ).select('-password -verifyOtp -passwordOtp');
    res.json(user);
  } catch (e) {
    next(e);
  }
};

const deleteUser: RequestHandler = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const user = await UserService.getModel().findByIdAndDelete(userId);
    res.json({ id: userId });
  } catch (e) {
    next(e);
  }
};

const deleteProduct: RequestHandler = async (req, res, next) => {
  try {
    const { productId } = req.params;
    const product = await ProductService.getModel().findByIdAndDelete(
      productId,
    );
    res.json({ id: productId });
  } catch (e) {
    next(e);
  }
};

export default {
  createAdmin,
  changeRequestStatus,
  getPendingRequest,
  getUser,
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  deleteProduct,
};
