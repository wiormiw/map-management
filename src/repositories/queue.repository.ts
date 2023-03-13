import RabbitMQAdapter from '../adapters/rabbitmq.adapter'
import { InfoQueueDTO } from '../models/dtos/queue.dto'
import { MapInterface } from '../models/interfaces/data/map.interface'

class QueueRepository {
  public async sendTo(country: string, message: MapInterface) {
    const queueInfo: InfoQueueDTO = {
      channel: 'map',
      country: country,
      queue: 'backward',
    }
    const queue = RabbitMQAdapter.getInstance()
    await queue.sendTo(queueInfo, message)
  }
}

export default QueueRepository
