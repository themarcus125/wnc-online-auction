export interface CreateUserDTO {
  email: string;
  name: string;
  dob?: Date;
  address: string;
  password: string;
}

export interface UpdateUserDTO {
  email?: string;
  name?: string;
  dob?: Date;
  address?: string;
  password?: string;
}
