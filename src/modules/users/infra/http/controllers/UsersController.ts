import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { classToClass } from 'class-transformer'

import CreateUserService from '@modules/users/services/CreateUserService'

class UsersController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { name, email, password } = req.body

    const service = container.resolve(CreateUserService)

    const user = await service.execute({ name, email, password })

    return res.status(201).json(classToClass(user))
  }
}

export default UsersController
