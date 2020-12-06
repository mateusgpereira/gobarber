import { Request, Response } from 'express'
import ListProviderAppointmentsService from '@modules/appointments/services/ListProviderAppointmentsService'
import { container } from 'tsyringe'

class ProviderAppointmentsController {
  public async index(req: Request, res: Response): Promise<Response> {
    const { year, month, day } = req.body
    const provider_id = req.user.id

    const service = container.resolve(ListProviderAppointmentsService)

    const appointments = await service.execute({
      provider_id,
      year,
      month,
      day
    })

    return res.json(appointments)
  }
}

export default ProviderAppointmentsController
