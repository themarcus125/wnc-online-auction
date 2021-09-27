import bcrypt from 'bcrypt';

export const getHashedPassword = (password: string) =>
  bcrypt.hashSync(password, 5);

export const comparePassword = (
  rawPassword: string,
  hashedPassword: string,
): boolean => bcrypt.compareSync(rawPassword, hashedPassword);

export const otpGen = (length: number) => {
  return Math.round(Math.random() * Math.pow(10, length))
    .toString()
    .padStart(length, '0');
};
