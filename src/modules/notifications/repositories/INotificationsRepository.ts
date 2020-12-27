import CreateNotificationDTO from '../dtos/CreateNotificationDTO'
import Notification from '../infra/typeorm/schemas/Notification'

interface INotificationsRepository {
  create(data: CreateNotificationDTO): Promise<Notification>
}

export default INotificationsRepository
