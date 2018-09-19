export interface Entry {
  domain?: string
  username?: string
  passwordVersion: number
}

export interface EntryList {
  [key: string]: Entry
}

export interface EntryLists {
  [version: number]: EntryList
}

export interface GetPasswordOptions {
  masterKey: string
  length: number
  domain: string
  username?: string
}

export interface GetPasswordFunc {
  (masterKey: string, length: number, domain: string, username: string): string | void
  (masterKey: string, length: number, domain: string): string | void
  (options: GetPasswordOptions): string | void
}

export interface GetKeyFunc {
  (masterKey: string, domain: string, username: string): string
  (masterKey: string, domain: string): string
}

export interface GetMasterKeyFunc {
  (masterPassword: string): string
}

export interface GeneratorConstructor {
  new(entryList: EntryList): GeneratorVersion
}

export interface GeneratorVersion {
  getPassword: GetPasswordFunc
  getMasterKey: GetKeyFunc
}

export interface GeneratorList {
  [version: number]: GeneratorVersion
}