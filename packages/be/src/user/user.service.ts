import { FilterQuery, QueryOptions } from 'mongoose';
import { CreateUserDTO, UpdateUserDTO } from './user.dto';
import { UserModel, UserDoc } from './user.schema';

const createUser = (dto: CreateUserDTO) => UserModel.create(dto);

const findUserById = (id: string, options?: QueryOptions) =>
  UserModel.findById(id, options).select('-password').exec();

const findUser = (filter: FilterQuery<UserDoc>, options?: QueryOptions) =>
  UserModel.findOne(filter, options).exec();

const updateUser = (
  filter: FilterQuery<UserDoc>,
  dto: UpdateUserDTO,
  options?: QueryOptions,
) => UserModel.findOneAndUpdate(filter, dto, options).exec();

export default {
  createUser,
  findUserById,
  findUser,
  updateUser,
};
