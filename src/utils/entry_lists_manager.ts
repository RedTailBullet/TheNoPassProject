import jsonfile from 'jsonfile'
import { EntryList, EntryLists } from '../models/interfaces';
import path from 'path'

export class EntryListManger {
  private readonly list: EntryList

  constructor(version: number) {
    const lists: EntryLists = jsonfile.readFileSync(path.join(process.cwd(), '/lists.json'))
    this.list = lists[version]
  }
}