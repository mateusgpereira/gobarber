import IStorateProvider from '../models/IStorageProvider'

class FakeStorageProvider implements IStorateProvider {
  private uploads: string[] = []

  public async saveFile(file: string): Promise<string> {
    this.uploads.push(file)
    return file
  }

  public async deleteFile(file: string): Promise<void> {
    const index = this.uploads.findIndex(storageFile => storageFile === file)

    if (index) {
      this.uploads.splice(index, 1)
    }
  }
}

export default FakeStorageProvider
