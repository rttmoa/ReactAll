import { trim, isEmpty, pick, isString, isPlainObject, find, includes, defer } from 'lodash';
import {
  User,
  LoginUserIdentity,
  EmailRecord,
  TokenRecord,
  DatabaseInterface,
  AuthenticationService,
  HashAlgorithm,
  ConnectionInformations,
  LoginResult,
} from '@accounts/types';
import { TwoFactor, AccountsTwoFactorOptions, getUserTwoFactorService } from '@accounts/two-factor';
import { AccountsServer, ServerHooks, generateRandomToken } from '@accounts/server';
// ? Utils下封装工具类
import {
  getUserResetTokens,
  getUserVerificationTokens,
  hashPassword,
  bcryptPassword, // 将密码 Password：加盐（salt）加密包
  verifyPassword, // 使用 bcryptjs 与库中密码比较
  isEmail, // 是否是邮箱； 验证
} from './utils';
import { PasswordCreateUserType, PasswordLoginType, PasswordType, ErrorMessages } from './types';
import { errors } from './errors';
import { getSteedosConfig, getObject } from '@steedos/objectql';
import { verifyCode, getVerifyRecord } from '../rest-express/endpoints/steedos/verify_code';

import { canEmailPasswordLogin } from '../core/index'

const _ = require('underscore');
const moment = require('moment');
export interface AccountsPasswordOptions {
  /**
   * Two factor options passed down to the @accounts/two-factor service.
   */
  twoFactor?: AccountsTwoFactorOptions;
  passwordHashAlgorithm?: HashAlgorithm;
  /**
   * The number of milliseconds from when a link to verify the user email is sent until token expires and user can't verify his email with the link anymore.
   * Defaults to 3 days.
   */
  verifyEmailTokenExpiration?: number;
  /**
   * The number of milliseconds from when a link to reset password is sent until token expires and user can't reset password with the link anymore.
   * Defaults to 3 days.
   */
  passwordResetTokenExpiration?: number;
  /**
   * The number of milliseconds from when a link to set inital password is sent until token expires and user can't set password with the link anymore.
   * Defaults to 30 days.
   */
  passwordEnrollTokenExpiration?: number;
  /**
   * Accounts password module errors
   */
  errors?: ErrorMessages;
  /**
   * Notify a user after his password has been changed.
   * This email is sent when the user reset his password and when he change it.
   * Default to true.
   */
  notifyUserAfterPasswordChanged?: boolean;
  /**
   * Default to false.
   */
  returnTokensAfterResetPassword?: boolean;
  /**
   * Invalidate existing sessions after password has been reset
   * Default to true.
   */
  invalidateAllSessionsAfterPasswordReset?: boolean;
  /**
   * Invalidate existing sessions after password has been changed
   * Default to false.
   */
  invalidateAllSessionsAfterPasswordChanged?: boolean;
  /**
   * Will automatically send a verification email after signup.
   * Default to false.
   */
  sendVerificationEmailAfterSignup?: boolean;
  /**
   * Function that will validate the user object during `createUser`.
   * The user returned from this function will be directly inserted in the database so be careful when you whitelist the fields,
   * By default we only allow `username`, `email` and `password` fields.
   */
  validateNewUser?: (
    user: PasswordCreateUserType
  ) => Promise<PasswordCreateUserType> | PasswordCreateUserType;
  /**
   * Function that check if the email is a valid email.
   * This function will be called when you call `createUser` and `addEmail`.
   */
  validateEmail?(email?: string): boolean;
  /**
   * Function that check if the password is valid.
   * This function will be called when you call `createUser` and `changePassword`.
   */
  validatePassword?(password?: PasswordType): boolean;
  /**
   * Function that check if the username is a valid username.
   * This function will be called when you call `createUser`.
   */
  validateUsername?(username?: string): boolean;
}

const defaultOptions = {
  // 3 days - 3 * 24 * 60 * 60 * 1000
  verifyEmailTokenExpiration: 259200000,
  // 3 days - 3 * 24 * 60 * 60 * 1000
  passwordResetTokenExpiration: 259200000,
  // 30 days - 30 * 24 * 60 * 60 * 1000
  passwordEnrollTokenExpiration: 2592000000,
  notifyUserAfterPasswordChanged: true,
  returnTokensAfterResetPassword: false,
  invalidateAllSessionsAfterPasswordReset: true,
  invalidateAllSessionsAfterPasswordChanged: false,
  validateEmail(email?: string): boolean {
    return !isEmpty(trim(email)) && isEmail(email);
  },
  validatePassword(password?: PasswordType): boolean {
    return !isEmpty(password);
  },
  validateUsername(username?: string): boolean {
    const usernameRegex = /^[a-zA-Z][a-zA-Z0-9]*$/;
    const isValid = username && !isEmpty(trim(username)) && usernameRegex.test(username);
    return Boolean(isValid);
  },
  errors,
  sendVerificationEmailAfterSignup: false,
};

const getPathFragmentPrefix = function(){
  const config = getSteedosConfig().email;
  const defaultPathPrefix = 'accounts/a/#';
  let pathFragmentPrefix = config && config.pathFragmentPrefix ? config.pathFragmentPrefix : defaultPathPrefix;
  if(pathFragmentPrefix && !/\/$/.test(pathFragmentPrefix)){
    pathFragmentPrefix += "/";
  }
  return pathFragmentPrefix;
}

interface MyDatabaseInterface extends DatabaseInterface{
  updateUser?(userId: string, options: any): Promise<void>;
}





// TODO =========================== { 密码业务逻辑 } ===========================
export default class AccountsPassword implements AuthenticationService {
  public serviceName = 'password';
  public server!: AccountsServer;
  public twoFactor: TwoFactor;
  private options: AccountsPasswordOptions & typeof defaultOptions;
  private db!: MyDatabaseInterface;


  constructor(options: AccountsPasswordOptions = {}) {
    this.options = { ...defaultOptions, ...options };
    this.twoFactor = new TwoFactor(options.twoFactor);
  }

  public setStore(store: DatabaseInterface) {
    this.db = store;
    this.twoFactor.setStore(store);
  }

  // ? 两步认证
  public async authenticate(params: any): Promise<User> {
    const { user, password, code, token, token_code, locale } = params;

    if(token){
      if (!user) {
        throw new Error(this.options.errors.unrecognizedOptionsForLogin);
      }
      return await this.codeAuthenticator(user, token, token_code, locale);
    }

    if (!user || !password) {
      throw new Error(this.options.errors.unrecognizedOptionsForLogin);
    }
    if ((!isString(user) && !isPlainObject(user)) || !isString(password)) {
      throw new Error(this.options.errors.matchFailed);
    }

    const foundUser = await this.passwordAuthenticator(user, password);

    // 如果用户激活了两部认证 身份验证，请尝试使用代码
    if (getUserTwoFactorService(foundUser)) {
      await this.twoFactor.authenticate(foundUser, code!);
    }

    return foundUser;
  }

  // ? 通过用户的 email 查找该用户
  public findUserByEmail(email: string): Promise<User | null> {
    return this.db.findUserByEmail(email);
  }

  // ? 查找用户通过用户名
  public findUserByUsername(username: string): Promise<User | null> {
    return this.db.findUserByUsername(username);
  }

  // ? 添加用户的电子邮件地址。 & 如果电子邮件无效，它将触发“validateEmail”选项并抛出异常。 &  使用这个而不是直接更新数据库。 
  public addEmail(userId: string, newEmail: string, verified: boolean): Promise<void> {
    if (!this.options.validateEmail(newEmail)) {
      throw new Error(this.options.errors.invalidEmail);
    }
    return this.db.addEmail(userId, newEmail, verified);
  }

  // ? 删除用户的电子邮件地址。 &  使用这个而不是直接更新数据库。
  public removeEmail(userId: string, email: string): Promise<void> {
    return this.db.removeEmail(userId, email);
  }

  // ? 将用户的电子邮件地址标记为已验证.     @param {string} token - 从验证 URL 检索到的令牌   @returns {Promise<void>}
  public async verifyEmail(token: string): Promise<void> {
    if (!token || !isString(token)) {
      throw new Error(this.options.errors.invalidToken);
    }

    const user = await this.db.findUserByEmailVerificationToken(token);
    if (!user) {
      throw new Error(this.options.errors.verifyEmailLinkExpired);
    }

    const verificationTokens = getUserVerificationTokens(user);
    const tokenRecord = find(verificationTokens, (t: TokenRecord) => t.token === token);
    if (!tokenRecord || this.isTokenExpired(tokenRecord, this.options.verifyEmailTokenExpiration)) {
      throw new Error(this.options.errors.verifyEmailLinkExpired);
    }

    const emailRecord = find(user.emails, (e: EmailRecord) => e.address === tokenRecord.address);
    if (!emailRecord) {
      throw new Error(this.options.errors.verifyEmailLinkUnknownAddress);
    }
    await this.db.verifyEmail(user.id, emailRecord.address);
  }

  /**
   * ? 使用电子邮件中收到的令牌重置用户的密码
   * @param {string} token - 从重置密码 URL 检索的令牌
   * @param {string} newPassword - 传递的新密码
   * @returns {Promise<LoginResult | null>} - 如果“returnTokensAfterResetPassword”选项为 true，则返回会话令牌和用户对象，否则返回 null。
   */
  public async resetPassword(token: string, newPassword: PasswordType, infos: ConnectionInformations): Promise<LoginResult | null> {
    if (!token || !isString(token)) {
      throw new Error(this.options.errors.invalidToken);
    }
    if (!newPassword || !isString(newPassword)) {
      throw new Error(this.options.errors.invalidNewPassword);
    }

    const user = await this.db.findUserByResetPasswordToken(token);
    if (!user) {
      throw new Error(this.options.errors.resetPasswordLinkExpired);
    }

    const resetTokens = getUserResetTokens(user);
    const resetTokenRecord = find(resetTokens, t => t.token === token);

    if (
      !resetTokenRecord ||
      this.isTokenExpired(
        resetTokenRecord,
        resetTokenRecord.reason === 'enroll' ? this.options.passwordEnrollTokenExpiration : this.options.passwordResetTokenExpiration
      )
    ) { throw new Error(this.options.errors.resetPasswordLinkExpired); }

    const emails = user.emails || [];
    if (
      !includes(
        emails.map((email: EmailRecord) => email.address),
        resetTokenRecord.address
      )
    ) {
      throw new Error(this.options.errors.resetPasswordLinkUnknownAddress);
    }

    const password = await this.hashAndBcryptPassword(newPassword);

    // 更改用户密码并删除旧令牌
    await this.db.setResetPassword(user.id, resetTokenRecord.address, password, token);

    this.server.getHooks().emit(ServerHooks.ResetPasswordSuccess, user);

    // 如果用户点击注册链接，我们可以验证他的电子邮件
    if (resetTokenRecord.reason === 'enroll') {
      await this.db.verifyEmail(user.id, resetTokenRecord.address);
    }

    // 更改密码会使现有会话失效
    if (this.options.invalidateAllSessionsAfterPasswordReset) {
      await this.db.invalidateAllSessions(user.id);
    }

    if (this.options.notifyUserAfterPasswordChanged) {
      const address = user.emails && user.emails[0].address;
      if (address) {
        const passwordChangedMail = this.server.prepareMail(
          address,
          '',
          this.server.sanitizeUser(user),
          '',
          this.server.options.emailTemplates.passwordChanged,
          this.server.options.emailTemplates.from
        );
        await this.server.options.sendMail(passwordChangedMail);
      }
    }

    if (this.options.returnTokensAfterResetPassword) {
      return this.server.loginWithUser(user, infos);
    }
    return null;
  }

  // ? 用户修改密码.
  public async setPassword(userId: string, newPassword: string): Promise<void> {
    const password = await bcryptPassword(newPassword);
    return this.db.setPassword(userId, password);
  }

  // ? 获取用户 (密码历史记录、最大登陆尝试次数、锁定间隔)
  public async getUserProfile(userId){
    const spaceId = getSteedosConfig().tenant._id;
    let password_history = 3;
    let max_login_attempts = 10;
    let lockout_interval = 15;
    const spaceUsers = await getObject('space_users').find({filters: `(user eq '${userId}') and (space eq '${spaceId}')`})
    if(spaceUsers.length > 0){
      const spaceUser = spaceUsers[0];
      const profiles = await getObject('permission_set').find({filters: `(name eq '${spaceUser.profile}') and (type eq 'profile') and (space eq '${spaceId}')`})
      if(profiles.length > 0){
        const userProfile = profiles[0]
        if(_.has(userProfile, 'password_history')){
          password_history = Number(userProfile.password_history)
        }
        if(_.has(userProfile, 'max_login_attempts')){
          max_login_attempts = Number(userProfile.max_login_attempts)
        }
        if(_.has(userProfile, 'lockout_interval')){
          lockout_interval = Number(userProfile.lockout_interval)
        }
      }
    }
    return Object.assign({password_history: password_history, max_login_attempts: max_login_attempts, lockout_interval: lockout_interval})
  }

  /**
   * ? 更改当前用户的密码。 &  如果密码无效，它将触发 `validatePassword` 选项并抛出异常。
   * @param {string} userId - User id.
   * @param {string} oldPassword - The user's current password.
   * @param {string} newPassword - A new password for the user.
   * @returns {Promise<void>} - Return a Promise.
   */
  public async changePassword(userId: string, oldPassword: string, newPassword: string): Promise<void> {
    if (!this.options.validatePassword(newPassword)) {
      throw new Error(this.options.errors.invalidPassword);
    }

    const user: any = await this.passwordAuthenticator({ id: userId }, oldPassword);
    const saas = getSteedosConfig().tenant.saas;
    if(!saas){
      const passwordHistory = user.services.password_history || []

      const userProfile = await this.getUserProfile(userId);
      
      const validPasswordHistory = _.last(passwordHistory, userProfile.password_history);
      for (const item of validPasswordHistory) {
        var verify = await verifyPassword(newPassword, item) // 循环验证密码
        if(verify){
          throw new Error('最近 ' + userProfile.password_history + ' 次密码不能相同');
        }
      }
    }
    const password = await bcryptPassword(newPassword);
    await this.db.setPassword(userId, password);

    this.server.getHooks().emit(ServerHooks.ChangePasswordSuccess, user);

    if (this.options.invalidateAllSessionsAfterPasswordChanged) {
      await this.db.invalidateAllSessions(user.id);
    }

    if (this.options.notifyUserAfterPasswordChanged) {
      const address = user.emails && user.emails[0].address;
      if (address) {
        const passwordChangedMail = this.server.prepareMail(
          address,
          '',
          this.server.sanitizeUser(user),
          '',
          this.server.options.emailTemplates.passwordChanged,
          this.server.options.emailTemplates.from
        );
        await this.server.options.sendMail(passwordChangedMail);
      }
    }
  }
  
  /**
   * ? @description 发送一封包含链接的电子邮件，用户可以使用该链接验证其电子邮件地址。
   * @param {string} [address] - 将电子邮件发送到用户的哪个地址。该地址必须位于用户的电子邮件列表中。默认为列表中第一封未经验证的电子邮件。如果地址已经验证，我们不会发送* 任何电子邮件。
   * @returns {Promise<void>} - Return a Promise.
   */
  public async sendVerificationEmail(address: string): Promise<void> {
    if (!address || !isString(address)) {
      throw new Error(this.options.errors.invalidEmail);
    }

    const user = await this.db.findUserByEmail(address);
    if (!user) {
      // To prevent user enumeration we fail silently
      if (this.server.options.ambiguousErrorMessages) {
        return;
      }
      throw new Error(this.options.errors.userNotFound);
    }

    // Do not send an email if the address is already verified
    const emailRecord = find(
      user.emails,
      (email: EmailRecord) => email.address.toLowerCase() === address.toLocaleLowerCase()
    );
    if (!emailRecord || emailRecord.verified) {
      return;
    }

    const token = generateRandomToken();
    await this.db.addEmailVerificationToken(user.id, address, token);

    const resetPasswordMail = this.server.prepareMail(
      address,
      token,
      this.server.sanitizeUser(user),
      getPathFragmentPrefix() + 'verify-email',
      this.server.options.emailTemplates.verifyEmail,
      this.server.options.emailTemplates.from
    );

    await this.server.options.sendMail(resetPasswordMail);
  }

  /**
   * ? @description 发送一封包含用户可用于重置密码的链接的电子邮件
   * @param {string} [address] - 将电子邮件发送到用户的哪个地址。 该地址必须在用户的电子邮件列表中。 默认为列表中的第一封电子邮件。 
   * @returns {Promise<void>} - Return a Promise.
   */
  public async sendResetPasswordEmail(address: string): Promise<void> {
    if (!address || !isString(address)) {
      throw new Error(this.options.errors.invalidEmail);
    }

    const user = await this.db.findUserByEmail(address);
    if (!user) {
      // To prevent user enumeration we fail silently
      if (this.server.options.ambiguousErrorMessages) {
        return;
      }
      throw new Error(this.options.errors.userNotFound);
    }
    const token = generateRandomToken();
    await this.db.addResetPasswordToken(user.id, address, token, 'reset');

    const resetPasswordMail = this.server.prepareMail(
      address,
      token,
      this.server.sanitizeUser(user),
      getPathFragmentPrefix() + 'reset-password',
      this.server.options.emailTemplates.resetPassword,
      this.server.options.emailTemplates.from
    );

    await this.server.options.sendMail(resetPasswordMail);
  }

  /** 
   * ? @description 发送一封包含用户可用于设置初始密码的链接的电子邮件。 单击链接后将验证用户的电子邮件。
   * @param {string} [address] - 将电子邮件发送到用户的哪个地址。 该地址必须在用户的电子邮件列表中。 默认为列表中的第一封电子邮件。
   * @returns {Promise<void>} - Return a Promise.
   */
  public async sendEnrollmentEmail(address: string): Promise<void> {
    if (!address || !isString(address)) {
      throw new Error(this.options.errors.invalidEmail);
    }

    const user = await this.db.findUserByEmail(address);
    if (!user) {
      throw new Error(this.options.errors.userNotFound);
    }
    const token = generateRandomToken();
    await this.db.addResetPasswordToken(user.id, address, token, 'enroll');

    const enrollmentMail = this.server.prepareMail(
      address,
      token,
      this.server.sanitizeUser(user),
      getPathFragmentPrefix() + 'enroll-account',
      this.server.options.emailTemplates.enrollAccount,
      this.server.options.emailTemplates.from
    );

    await this.server.options.sendMail(enrollmentMail);
  }

  // ? 创建一个新用户  (先校验，再创建用户)    @parmas { User: Object }   @return Promise { userId: string }
  public async createUser(user: PasswordCreateUserType): Promise<string> {
    if (!user.email && !user.mobile) {
      throw new Error(this.options.errors.emailOrMobileRequired);
    }

    if (user.username && !this.options.validateUsername(user.username)) {
      throw new Error(this.options.errors.invalidUsername);
    }

    if (user.email && !this.options.validateEmail(user.email)) {
      throw new Error(this.options.errors.invalidEmail);
    }

    if (user.username && (await this.db.findUserByUsername(user.username))) {
      throw new Error(this.options.errors.usernameAlreadyExists);
    }

    if (user.email && (await this.db.findUserByEmail(user.email))) {
      throw new Error(this.options.errors.emailAlreadyExists);
    }

    if (user.password) {
      if (!this.options.validatePassword(user.password)) {
        throw new Error(this.options.errors.invalidPassword);
      }
      user.password = await this.hashAndBcryptPassword(user.password);
    }

    // If user does not provide the validate function only allow some fields
    user = this.options.validateNewUser
      ? await this.options.validateNewUser(user)
      : pick<PasswordCreateUserType, 'username' | 'email' | 'password' | 'mobile' | 'locale'>(user, [
          'username',
          'email',
          'password',
          'mobile',
          'locale'
        ]);

    try {
      const userId = await this.db.createUser(user);
      defer(async () => {
        if (this.options.sendVerificationEmailAfterSignup && user.email)
          this.sendVerificationEmail(user.email);

        const userRecord = (await this.db.findUserById(userId)) as User;
        this.server.getHooks().emit(ServerHooks.CreateUserSuccess, userRecord);
      });

      return userId;
    } catch (e) {
      await this.server.getHooks().emit(ServerHooks.CreateUserError, user);
      throw e;
    }
  }

  // ? 令牌是否已过期
  public isTokenExpired(tokenRecord: TokenRecord, expiryDate: number): boolean {
    return Number(tokenRecord.when) + expiryDate < Date.now();
  }

  // ? 验证用户密码通过邮箱
  public async verifyUserPasswordByEmail(email, password){
    return await this.passwordAuthenticator({email: email}, password);
  }

  // ? 密码登陆验证器;  判断密码是否有效、密码是否被锁、密码是否过期
  private async passwordAuthenticator( user: string | LoginUserIdentity, password: PasswordType ): Promise<User> {
    const { username, email, id } = isString(user) ? this.toUsernameAndEmail({ user }) : this.toUsernameAndEmail({ ...user });

    let foundUser: any | null = null;

    // 根据 id、用户名、邮箱 查找用户
    if (id) {
      // this._validateLoginWithField('id', user);
      foundUser = await this.db.findUserById(id);
    } else if (username) {
      // this._validateLoginWithField('username', user);
      foundUser = await this.db.findUserByUsername(username);
    } else if (email) {
      // this._validateLoginWithField('email', user);
      foundUser = await this.db.findUserByEmail(email);
      if(foundUser){
        if(!canEmailPasswordLogin(foundUser)){
          throw new Error("accounts.disableUnverifiedEmailPasswordLogin");
        }
      }
    }
    // 没有查找到用户，抛出错误
    if (!foundUser) {
      throw new Error(
        this.server.options.ambiguousErrorMessages
          ? this.options.errors.invalidCredentials
          : this.options.errors.userNotFound
      );
    }

    const hash = await this.db.findPasswordHash(foundUser.id);
    if (!hash) {
      throw new Error(this.options.errors.noPasswordSet);
    }
    const saas = getSteedosConfig().tenant.saas;
    if(!saas){
      const locked = foundUser.lockout;
      const login_failed_lockout_time = foundUser.login_failed_lockout_time;
      if(locked){
        if(!login_failed_lockout_time){
          throw new Error('账户已锁定，请联系管理员');
        }else{
          if(moment(login_failed_lockout_time).isAfter(new Date())){
            throw new Error('账户已锁定，请联系管理员');
          }
        }
      }
    }

    const hashAlgorithm = this.options.passwordHashAlgorithm;
    const pass: any = hashAlgorithm ? hashPassword(password, hashAlgorithm) : password;
    const isPasswordValid = await verifyPassword(pass, hash);

    if (!isPasswordValid) {
      if(!saas){
        const userProfile = await this.getUserProfile(foundUser.id);

        await this.db.updateUser(foundUser.id, {$inc: {login_failed_number: 1}});

        const user: any = await this.db.findUserById(foundUser.id);
        if(user.login_failed_number >= userProfile.max_login_attempts){
          let lockout_interval = userProfile.lockout_interval;
          let login_failed_lockout_time = null;
          if(lockout_interval === 0){
            login_failed_lockout_time = null;
          }else{
            login_failed_lockout_time = new Date(moment().add(userProfile.lockout_interval, 'm'))
          }
          await this.db.updateUser(foundUser.id, {$set: {lockout: true, login_failed_lockout_time: login_failed_lockout_time}});
        }
      }
      throw new Error(
        this.server.options.ambiguousErrorMessages ? this.options.errors.invalidCredentials : this.options.errors.incorrectPassword
      );
    }else{
      await this.db.updateUser(foundUser.id, {$set: {lockout: false, login_failed_number: 0}, $unset: {login_failed_lockout_time: 1}});
    }

    return foundUser;
  }


  //  ? 鉴别用户身份；是否查找到 User 信息； @return Promise { Error | User }
  private async codeAuthenticator(user, token, token_code, locale): Promise<User> {
    
    const { username, email, id } = isString(user) ? this.toUsernameAndEmail({ user }) : this.toUsernameAndEmail({ ...user });
    const verifyRecord: any = await getVerifyRecord(token);

    if(!verifyRecord){
      throw new Error('accounts.invalidRequest');
    }

    let foundUser: User | null = null;

    // 如果有 id 根据id查找
    if (id) {
      // this._validateLoginWithField('id', user);
      foundUser = await this.db.findUserById(id);
    } else if (username) {
      // this._validateLoginWithField('username', user);
      foundUser = await this.db.findUserByUsername(username);
    } else if (email) {
      // this._validateLoginWithField('email', user);
      foundUser = await this.db.findUserByEmail(email);
    }

    let hasVerified = false;

    if(!foundUser && verifyRecord.action.endsWith('SignupAccount')){
      hasVerified = true;
      const result = await verifyCode(null, token, token_code, {locale:locale, server: this});
      if(result.verified){
        foundUser = await this.db.findUserById(result.userId);
      }
    }

    // 没有找到 User 信息
    if (!foundUser) {
      throw new Error(
        this.server.options.ambiguousErrorMessages ? this.options.errors.invalidCredentials : this.options.errors.userNotFound
      );
    }
    if(!hasVerified){
      const result = await verifyCode(foundUser.id, token, token_code, {locale:locale, createUser: this.createUser})
      if (!result.verified) {
        throw new Error(
          this.server.options.ambiguousErrorMessages ? this.options.errors.invalidCredentials : this.options.errors.incorrectPassword
        );
      }
    }
    return foundUser;
  }

  // ? 使用哈希密码还是普通密码；结果密码使用 salt 加盐处理
  private async hashAndBcryptPassword(password: PasswordType): Promise<string> {
    const hashAlgorithm = this.options.passwordHashAlgorithm;
    const hashedPassword: any = hashAlgorithm ? hashPassword(password, hashAlgorithm) : password;
    return bcryptPassword(hashedPassword);
  }

  /**
   * ? 给定用户名、用户和/或电子邮件，找出用户名和/或电子邮件。 
   * @param user An object containing at least `username`, `user` and/or `email`.
   * @returns An object containing `id`, `username` and `email`.
   */
  private toUsernameAndEmail({ user, username, email, id }: any): any {
    if (user && !username && !email) {
      if (isEmail(user)) {
        email = user;
        username = null;
      } else {
        username = user;
        email = null;
      }
    }
    return { username, email, id };
  }
}
