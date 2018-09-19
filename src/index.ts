import { EntryLists, GeneratorVersion } from './models/interfaces';

export class PassGen {
  private static masterKey: string
  private static entryLists: EntryLists
  private static generator: GeneratorVersion

  public static init (masterPassword: string, version: number = 1) {

  }

  private static getMasterKey (masterPassword: string, version: number = 1) {

  }
}