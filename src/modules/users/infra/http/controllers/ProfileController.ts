import { Request, Response } from 'express'
import { container } from 'tsyringe'

import UpdateProfileService from '@modules/users/services/UpdateProfileService'
import ShowProfileService from '@modules/users/services/ShowProfileService'

class UpdateProfileController {
  public async show(req: Request, res: Response): Promise<Response> {
    const { id } = req.user
    const service = container.resolve(ShowProfileService)

    const user = await service.execute({ user_id: id })

    return res.json(user)
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { id } = req.user
    const { name, email, password, old_password } = req.body
    const service = container.resolve(UpdateProfileService)

    const updatedUserProfile = await service.execute({
      user_id: id,
      name,
      email,
      password,
      old_password
    })

    delete updatedUserProfile.password

    return res.json(updatedUserProfile)
  }
}

export default UpdateProfileController
