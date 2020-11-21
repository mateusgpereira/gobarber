import { container } from 'tsyringe'
import { Request, Response } from 'express'

import ListProvidersService from '@modules/appointments/services/ListProvidersService'

class ProvidersController {
  public async index(req: Request, res: Response): Promise<Response> {
    const { id } = req.user

    const service = container.resolve(ListProvidersService)

    const providers = await service.execute({ except_user_id: id })

    return res.json(providers)
  }
}

export default ProvidersController
