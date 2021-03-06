import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { classToClass } from 'class-transformer'
import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService'

class UserAvatarController {
  public async update(req: Request, res: Response): Promise<Response> {
    const service = container.resolve(UpdateUserAvatarService)

    const user = await service.execute({
      user_id: req.user.id,
      avatarFilename: req.file.filename
    })

    return res.json(classToClass(user))
  }
}

export default UserAvatarController
