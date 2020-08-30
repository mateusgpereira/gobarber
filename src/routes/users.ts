import { Router } from 'express'
import CreateUserService from '../services/CreateUserService'

const routes = Router()

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

export default routes
