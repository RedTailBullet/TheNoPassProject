import { BaseVersion } from './base';
import { GetPasswordOptions } from '../models/interfaces';
import _ from 'lodash';
import { ERROR_MESSAGES } from '../messages';
import crypto from 'crypto-js'
import { Tools } from '../tools/v1';

export class Version1 extends BaseVersion {

  public getPassword (masterKey: string | GetPasswordOptions, length: number = 16, domain?: string, username?: string) {
    let key: string

    if (typeof masterKey === 'object') {
      key = masterKey.masterKey
      domain = masterKey.domain
      username = masterKey.username
    }
    else {
      key = masterKey
    }
    if (_.isEmpty(domain))
      throw ERROR_MESSAGES.LACKING_DOMAIN

    let password = Tools.stringXOR(crypto.SHA256(`${domain}${username || ''}`).toString(crypto.enc.Utf8), key)
    return Tools.foldPasswordToLength(password, length)
  }

  public getMasterKey (masterPassword: string): string {
    let masterKey1 = masterPassword

    // Hash master password twice.
    for (let i = 0; i < 2; i++) {
      masterKey1 = crypto.SHA256(masterKey1).toString(crypto.enc.Utf8)
    }
    const masterKey2 = crypto.SHA256(masterKey1).toString(crypto.enc.Utf8)
    return Tools.stringXOR(masterKey1, masterKey2)
  }
}