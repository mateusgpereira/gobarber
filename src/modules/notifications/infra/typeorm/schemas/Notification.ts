import {
  Column,
  Entity,
  ObjectID,
  ObjectIdColumn,
  CreateDateColumn,
  UpdateDateColumn
} from 'typeorm'

@Entity('notifications')
class Notification {
  @ObjectIdColumn()
  id: ObjectID

  @Column()
  content: string

  @Column({ default: false })
  read: boolean

  @Column('uuid')
  recipient_id: string

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date
}

export default Notification
