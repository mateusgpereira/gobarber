import { Router } from 'express'
import multer from 'multer'
import CreateUserService from '@modules/users/services/CreateUserService'
import uploadConfig from '@config/upload'
import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarServices'
import auth from '../middlewares/auth'

const routes = Router()

const upload = multer(uploadConfig)

routes.post('/', async (req, res) => {
  const { name, email, password } = req.body

  const service = new CreateUserService()

  const user = await service.execute({ name, email, password })
  delete user.password
  return res.status(201).json(user)
})

routes.patch('/avatar', auth, upload.single('avatar'), async (req, res) => {
  const service = new UpdateUserAvatarService()

  const user = await service.execute({
    user_id: req.user.id,
    avatarFilename: req.file.filename
  })

  delete user.password

  return res.json(user)
})

export default routes
