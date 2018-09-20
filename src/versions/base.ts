import crypto from 'crypto-js'
import { GeneratorVersion, EntryList, GetKeyFunc, GetPasswordOptions } from '../models/interfaces';

export abstract class BaseVersion implements GeneratorVersion {
  private entryList: EntryList

  constructor(entryList: EntryList) {
    this.entryList = entryList
  }

  abstract getPassword (masterKey: string | GetPasswordOptions, length?: number, domain?: string, username?: string): string

  protected getKey (domain: string, username?: string) {
    return crypto.SHA256(`${domain}${username || ''}`)
  }

  abstract getMasterKey (masterPassword: string): string
}