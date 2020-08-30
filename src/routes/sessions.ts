import { Router } from 'express'
import AuthenticateUserService from '../services/AuthenticateUserService'

const routes = Router()

routes.post('/', async (req, res) => {
  try {
    const { email, password } = req.body
    const service = new AuthenticateUserService()

    const { user, token } = await service.execute({ email, password })

    return res.json({ user, token })
  } catch (err) {
    return res.status(400).json(err.message)
  }
})

export default routes
