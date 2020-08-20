import { isEqual } from 'date-fns'
import Appointment from '../models/Appointment'

interface AppointmentDTO {
  provider: string
  date: Date
}

class AppointmentsRepository {
  private appointments: Appointment[]

  constructor(appointments: Appointment[]) {
    this.appointments = appointments
  }

  public all(): Appointment[] {
    return this.appointments
  }

  public create({ provider, date }: AppointmentDTO): Appointment {
    const appointment = new Appointment({ provider, date })

    this.appointments.push(appointment)

    return appointment
  }

  public findByDate(date: Date): Appointment | null {
    const foundAppointment = this.appointments.find(appointment =>
      isEqual(date, appointment.date)
    )

    return foundAppointment || null
  }
}

export default AppointmentsRepository
