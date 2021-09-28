export enum CheckEmailMessage {
  VALID = 'VALID',
  INVALID = 'INVALID',
  NON_UNIQUE = 'NON_UNIQUE',
}

export enum CheckPasswordMessage {
  VALID = 'VALID',
  SHORT = 'SHORT',
}

export enum EmailOtpMessage {
  VERIFIED = 'VERIFIED',
  NO_OTP = 'NO_OTP',
  EXPIRED = 'EXPIRED',
  WRONG_OTP = 'WRONG_OTP',
}

export enum ResetPasswordOtpMessage {
  SUCCESS = 'SUCESS',
  NO_OTP = 'NO_OTP',
  EXPIRED = 'EXPIRED',
  WRONG_OTP = 'WRONG_OTP',
}
