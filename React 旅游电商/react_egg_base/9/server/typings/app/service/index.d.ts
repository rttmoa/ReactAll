// This file is created by egg-ts-helper@1.25.6
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportBase = require('../../../app/service/base');
import ExportUser = require('../../../app/service/user');

declare module 'egg' {
  interface IService {
    base: ExportBase;
    user: ExportUser;
  }
}
