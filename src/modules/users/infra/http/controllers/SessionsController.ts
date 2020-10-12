import { Request, Response } from 'express'
import { container } from 'tsyringe'

import AuthenticateUserService from '@modules/users/services/AuthenticateUserService'

class SessionsController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body

    const service = container.resolve(AuthenticateUserService)

    const { user, token } = await service.execute({ email, password })

    return res.json({ user, token })
  }
}

export default SessionsController
