import IHashProvider from '../models/IHashProvider'

class FakeHashProvider implements IHashProvider {
  public async generateHash(payload: string): Promise<string> {
    return payload
  }

  public async compare(password: string, hashed: string): Promise<boolean> {
    return password === hashed
  }
}

export default FakeHashProvider
