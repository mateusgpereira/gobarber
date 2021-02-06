import { Request, Response } from 'express'
import { container } from 'tsyringe'
import ListProviderDayAvailabilityService from '@modules/appointments/services/ListProviderDayAvailabilityService'

class ProviderDayAvailabilityController {
  public async index(req: Request, res: Response): Promise<Response> {
    const provider_id = req.params.id
    const { year, month, day } = req.query
    const service = container.resolve(ListProviderDayAvailabilityService)

    const availability = await service.execute({
      year: Number(year),
      month: Number(month),
      day: Number(day),
      provider_id
    })

    return res.json(availability)
  }
}

export default ProviderDayAvailabilityController
