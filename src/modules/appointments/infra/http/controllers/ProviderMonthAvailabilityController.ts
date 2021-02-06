import { Request, Response } from 'express'
import { container } from 'tsyringe'
import ListProviderMonthAvailabilityService from '@modules/appointments/services/ListProviderMonthAvailabilityService'

class ProviderMonthAvailabilityController {
  public async index(req: Request, res: Response): Promise<Response> {
    const provider_id = req.params.id
    const { year, month } = req.query

    const service = container.resolve(ListProviderMonthAvailabilityService)

    const availability = await service.execute({
      provider_id,
      year: Number(year),
      month: Number(month)
    })

    return res.json(availability)
  }
}

export default ProviderMonthAvailabilityController
