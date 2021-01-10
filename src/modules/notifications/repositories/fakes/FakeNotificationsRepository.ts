import { ObjectID } from 'mongodb'
import INotificationsRepository from '../INotificationsRepository'
import Notification from '../../infra/typeorm/schemas/Notification'
import CreateNotificationDTO from '../../dtos/CreateNotificationDTO'

class FakeNotificationsRepository implements INotificationsRepository {
  private notifications: Notification[] = []

  public async create({
    content,
    recipient_id
  }: CreateNotificationDTO): Promise<Notification> {
    const notification = new Notification()
    Object.assign(notification, { id: new ObjectID(), content, recipient_id })
    this.notifications.push(notification)

    return notification
  }
}

export default FakeNotificationsRepository
