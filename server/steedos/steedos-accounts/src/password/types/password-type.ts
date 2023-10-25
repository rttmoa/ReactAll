import { HashAlgorithm } from '@accounts/types';

export type PasswordType =
  | string
  | {
      digest: string;
      algorithm: HashAlgorithm; //! 哈希算法；'sha' | 'sha1' | 'sha224' | 'sha256' | 'sha384' | 'sha512' | 'md5' | 'ripemd160'
    };
