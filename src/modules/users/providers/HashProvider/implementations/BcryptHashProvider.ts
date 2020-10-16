import { hash, compare } from 'bcryptjs'

import IHashProvider from '../models/IHashProvider'

class BcryptHashProvider implements IHashProvider {
  public async generateHash(payload: string): Promise<string> {
    return hash(payload, 8)
  }

  public async compare(password: string, hashed: string): Promise<boolean> {
    return compare(password, hashed)
  }
}

export default BcryptHashProvider
