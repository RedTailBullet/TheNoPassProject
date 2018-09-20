import { EntryLists, GeneratorVersion } from './models/interfaces';
import { generatorList } from './versions';
import { EntryListManger } from './utils/entry_lists_manager';

export class PassGen {
  private readonly masterKey: string
  private readonly entryListManager: EntryListManger
  private readonly generator: GeneratorVersion

  constructor(masterPassword: string, version: number) {
    this.generator = generatorList[version]
    this.masterKey = this.generator.getMasterKey(masterPassword)
    this.entryListManager = new EntryListManger(version)
  }

  private static getMasterKey (masterPassword: string, version: number = 1) {

  }
}