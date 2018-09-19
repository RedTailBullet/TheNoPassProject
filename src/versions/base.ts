import crypto from 'crypto-js'
import { GeneratorVersion, EntryList, GetKeyFunc, GetPasswordOptions } from '../models/interfaces';

export abstract class BaseVersion implements GeneratorVersion {
  private entryList: EntryList

  constructor(entryList: EntryList) {
    this.entryList = entryList
  }

  abstract getPassword (masterKey: string | GetPasswordOptions, length?: number, domain?: string, username?: string): string

  private getKey (masterKey: string, domain: string, username?: string) {
    return crypto.HmacSHA256(`${domain}${username || ''}`, masterKey)
  }

  abstract getMasterKey (masterPassword: string): string
}