import { ERROR_MESSAGES } from '../messages';
import * as math from 'mathjs'
import * as crypto from 'crypto-js'

export class Tools {
  public static string2NumberArray (str: string): number[] {
    const array = str.split('')
    const result = new Array<number>()
    array.forEach(char => {
      result.push(char.charCodeAt(0))
    })
    return result
  }

  public static numberArray2String (list: number[]): string {
    let result = ''
    list.forEach(number => {
      result += String.fromCharCode(number)
    })
    return result
  }

  public static stringXOR (str1: string, str2: string): string {
    const numberList1 = this.string2NumberArray(str1)
    const numberList2 = this.string2NumberArray(str2)
    if (numberList1.length !== numberList2.length)
      throw ERROR_MESSAGES.XOR_STRINGS_LENGTH_MISMATCH
    const resultArray = new Array<string>()
    for (let i = 0; i < numberList1.length; i++) {
      resultArray.push(String.fromCharCode(numberList1[i] ^ numberList2[i]))
    }
    return resultArray.join('')
  }

  public static foldPasswordToLength (password: string, length: number) {
    let lcm = math.lcm(password.length, length)
    if (lcm !== 1) {
      password = this.extendPassword(password, lcm)
    }
    let result = this.numberArray2String(new Array<number>(length).fill(0))
    for (let i = 0; i + length < password.length; i += length) {
      const subPassword = password.slice(i, i + length)

      // Avoid XORing same string.
      if (result === subPassword)
        continue
      result = this.stringXOR(result, subPassword)
    }
    return result
  }

  private static extendPassword (password: string, factor: number) {
    for (let i = 0; i < factor; i++) {
      password += crypto.SHA256(password)
    }
    return password
  }
}