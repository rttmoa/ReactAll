/*
 * @Author: baozhoutao@steedos.com
 * @Date: 2022-05-19 11:38:30
 * @LastEditors: baozhoutao@steedos.com
 * @LastEditTime: 2022-06-06 12:01:19
 * @Description: 
 */
import * as express from 'express';
import { AccountsServer } from '../../../server';
import { sendError } from '../../utils/send-error';
import { getSteedosConfig } from '@steedos/objectql'
import { hashPassword } from '../../../password/utils';

const config = getSteedosConfig();
declare var Creator;

export const changePassword = (accountsServer: AccountsServer) => async (
  req: express.Request,
  res: express.Response
) => {
  try {
    if (!(req as any).userId) {
      res.status(401);
      res.json({ message: 'Unauthorized' });
      return;
    }
    // oldPassword 、newPassword 已经是 sha256之后的
    const { oldPassword, newPassword } = req.body;

    // let passworPolicy = ((config as any).password || {}).policy

    // if(passworPolicy){
    //   if(!(new RegExp(passworPolicy)).test(newPassword || '')){
    //       sendError(res, new Error((config as any).password.policyError));
    //       return;
    //   }
    // }
    
    const password: any = accountsServer.getServices().password;

    await password.changePassword((req as any).userId, oldPassword, newPassword);
    password.db.collection.updateOne({_id: (req as any).userId}, {$set: {password_expired: false}})
    try {
      Creator.getCollection('space_users').update({user: (req as any).userId}, {$set: {password_expired: false}}, {
        multi: true
      })
    } catch (error) {
      console.log('error', error);
    }
    res.json({userId: (req as any).userId, password_expired: false});
  } catch (err) {
    sendError(res, err);
  }
};
