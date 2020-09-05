import { Router } from 'express'
import multer from 'multer'
import CreateUserService from '../services/CreateUserService'
import auth from '../middlewares/auth'
import uploadConfig from '../config/upload'

const routes = Router()

const upload = multer(uploadConfig)

routes.post('/', async (req, res) => {
  try {
    const { name, email, password } = req.body

    const service = new CreateUserService()

    const user = await service.execute({ name, email, password })
    delete user.password
    return res.status(201).json(user)
  } catch (err) {
    return res.status(400).json(err.message)
  }
})

routes.patch('/avatar', auth, upload.single('avatar'), (req, res) => {
  return res.json({ ok: true })
})

export default routes
