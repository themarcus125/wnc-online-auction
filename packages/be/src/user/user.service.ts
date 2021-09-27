import { CreateUserDTO, UpdateUserDTO } from './user.dto';
import { UserModel, UserDoc } from './user.schema';
import BaseService from '@/utils/base.service';
import { validateEmail } from '@/utils/validator';
import { comparePassword } from '@/utils/password';

export enum CheckEmailMessage {
  VALID,
  INVALID,
  NONUNIQUE,
}

export enum CheckPasswordMessage {
  VALID,
  SHORT,
  SAME,
}

class UserService extends BaseService<UserDoc, CreateUserDTO> {
  constructor() {
    super(UserModel);
  }
  async checkEmail(email: string) {
    const isEmail = validateEmail(email);
    if (!isEmail) return CheckEmailMessage.INVALID;
    const isNonUnique = await this.model.exists({ email });
    if (isNonUnique) return CheckEmailMessage.NONUNIQUE;
    return CheckEmailMessage.VALID;
  }
  checkPassword(password: string, hashedPassword?: string) {
    const isPassword = password.length >= 6;
    if (!isPassword) return CheckPasswordMessage.SHORT;
    if (hashedPassword && comparePassword(password, hashedPassword))
      return CheckPasswordMessage.SAME;
    return CheckPasswordMessage.VALID;
  }
}

export default new UserService();
