import * as bcrypt from 'bcryptjs';
import { createHash } from 'crypto';
import { PasswordType } from '../types/password-type';



// !将密码 Password：加盐（salt）加密包
export const bcryptPassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  return hash;
};

// 哈希密码
export const hashPassword = (password: PasswordType, algorithm: string) => {
  if (typeof password === 'string') {
    const hash = createHash(algorithm);
    hash.update(password);
    return hash.digest('hex');
  }

  return password.digest;
};

// 确认密码
export const verifyPassword = async (password: string, hash: string): Promise<boolean> => bcrypt.compare(password, hash);
