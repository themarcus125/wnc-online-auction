import bcrypt from 'bcrypt';

export const getHashedPassword = (password: string) =>
  bcrypt.hashSync(password, 5);

export const comparePassword = (
  rawPassword: string,
  hashedPassword: string,
): boolean => bcrypt.compareSync(rawPassword, hashedPassword);
