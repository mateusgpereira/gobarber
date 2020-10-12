import { Router } from 'express'
import AuthenticateUserService from '@modules/users/services/AuthenticateUserService'
import UserRepository from '../../typeorm/repositories/UserRepository'

const routes = Router()

routes.post('/', async (req, res) => {
  const { email, password } = req.body
  const repository = new UserRepository()
  const service = new AuthenticateUserService(repository)

  const { user, token } = await service.execute({ email, password })

  return res.json({ user, token })
})

export default routes
