import { RequestHandler } from 'express';
import UserService from '@/user/user.service';
import { RegisterDTO } from '@/auth/auth.dto';

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

export default {
  createAdmin,
};
