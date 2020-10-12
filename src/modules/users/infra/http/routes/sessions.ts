import { Router } from 'express'
import { container } from 'tsyringe'
import AuthenticateUserService from '@modules/users/services/AuthenticateUserService'

const routes = Router()

routes.post('/', async (req, res) => {
  const { email, password } = req.body

  const service = container.resolve(AuthenticateUserService)

  const { user, token } = await service.execute({ email, password })

  return res.json({ user, token })
})

export default routes
