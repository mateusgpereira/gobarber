import { Router } from 'express'
import AuthenticateUserService from '../services/AuthenticateUserService'

const routes = Router()

routes.post('/', async (req, res) => {
  const { email, password } = req.body
  const service = new AuthenticateUserService()

  const { user, token } = await service.execute({ email, password })

  return res.json({ user, token })
})

export default routes
