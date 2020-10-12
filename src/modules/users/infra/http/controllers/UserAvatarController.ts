import { Request, Response } from 'express'
import { container } from 'tsyringe'
import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarServices'

class UserAvatarController {
  public async update(req: Request, res: Response): Promise<Response> {
    const service = container.resolve(UpdateUserAvatarService)

    const user = await service.execute({
      user_id: req.user.id,
      avatarFilename: req.file.filename
    })

    delete user.password

    return res.json(user)
  }
}

export default UserAvatarController
