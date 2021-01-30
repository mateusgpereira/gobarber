import path from 'path'
import crypto from 'crypto'
import multer, { StorageEngine } from 'multer'

const tmpFolder = path.resolve(__dirname, '..', '..', 'tmp')
const uploadsFolder = path.resolve(tmpFolder, 'uploads')

interface IUploadConfig {
  driver: 's3' | 'disk'
  multer: {
    storage: StorageEngine
  }
  config: {
    aws: {
      bucket: string
    }
  }
}

const uploadConfig: IUploadConfig = {
  driver:
    process.env.STORAGE_DRIVER === 's3' ? process.env.STORAGE_DRIVER : 'disk',
  multer: {
    storage: multer.diskStorage({
      destination: tmpFolder,
      filename(req, file, callback) {
        const fileHash = crypto.randomBytes(10).toString('hex')
        const fileName = `${fileHash}-${file.originalname}`
        return callback(null, fileName)
      }
    })
  },
  config: {
    aws: {
      bucket: 'bucket-dus-guri'
    }
  }
}

export { tmpFolder, uploadsFolder, uploadConfig as default }
