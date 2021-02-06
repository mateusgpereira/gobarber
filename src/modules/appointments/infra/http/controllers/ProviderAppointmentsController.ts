import { Request, Response } from 'express'
import ListProviderAppointmentsService from '@modules/appointments/services/ListProviderAppointmentsService'
import { container } from 'tsyringe'
import { classToClass } from 'class-transformer'

class ProviderAppointmentsController {
  public async index(req: Request, res: Response): Promise<Response> {
    const { year, month, day } = req.query
    const provider_id = req.user.id

    const service = container.resolve(ListProviderAppointmentsService)

    const appointments = await service.execute({
      provider_id,
      year: Number(year),
      month: Number(month),
      day: Number(day)
    })

    return res.json(classToClass(appointments))
  }
}

export default ProviderAppointmentsController
