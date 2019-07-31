import { getManager, Repository } from "typeorm";
import { Logger, ILogger } from "../utils/logger";

// Import Entities
import { Message } from "../entities/message.entity";
import { User } from "../entities/user.entity";
import { Config } from "../entities/config.entity";

export class MessageService {
  messageRepository: Repository<Message>;
  logger: ILogger;

  constructor() {
    this.logger = new Logger(__filename);
    this.messageRepository = getManager().getRepository(Message);
  }

  /**
   * Inserts a new Message into the database.
   */
  async insert(message: Message): Promise<Message> {
    const newMessage = this.messageRepository.create(message);
    return await this.messageRepository.save(newMessage);
  }

  /**
   * Returns a boolean that User has a message
   */
  async hasMessage(recipient: User, name: Config): Promise<boolean> {
    try {
      const hasMessage = await this.messageRepository.findOne({
        where: { recipient, name }
      });

      if (hasMessage) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
