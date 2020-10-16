interface IHashProvider {
  generateHash(payload: string): Promise<string>
  compare(password: string, hashed: string): Promise<boolean>
}

export default IHashProvider
