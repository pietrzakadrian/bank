import { getManager, Repository } from "typeorm";
import { Logger, ILogger } from "../utils/logger";

// Import Services
import { UserService } from "./users.service";

// Import Entities
import { Additional } from "../entities/additional.entity";
import { Transaction } from "../entities/transaction.entity";

export class AdditionalService {
  additionalRepository: Repository<Additional>;
  transactionRepository: Repository<Transaction>;
  logger: ILogger;

  constructor() {
    this.logger = new Logger(__filename);
    this.additionalRepository = getManager().getRepository(Additional);
    this.transactionRepository = getManager().getRepository(Transaction);
  }

  /**
   * Creates an instance of Additional.
   */
  instantiate(data: Object): Additional | undefined {
    return this.additionalRepository.create(data);
  }

  /**
   * Inserts a new Additional into the database.
   */
  async insert(data: Additional): Promise<Additional> {
    this.logger.info("Create a new additional", data);
    const newAdditional = this.additionalRepository.create(data);
    return await this.additionalRepository.save(newAdditional);
  }

  /**
   * Unsets user's all notifications
   */
  async unsetNotifications(id: number): Promise<Object | undefined> {
    const userService = new UserService();
    const user = await userService.getById(id);

    try {
      return await this.additionalRepository.update(
        { user },
        {
          notificationCount: 0,
          notificationStatus: false
        }
      );
    } catch (error) {
      return Promise.reject(error);
    }
  }

  /**
   * Returns a additional by given id
   */
  async getById(id: string | number): Promise<Additional> {
    this.logger.info("Fetching additional by id: ", id);
    if (id) {
      return await this.additionalRepository.findOne(id);
    }
    return Promise.reject(false);
  }

  /**
   * Returns a additiona by userId
   */
  async getByUserId(id: number): Promise<Additional | undefined> {
    const userService = new UserService();
    const user = await userService.getById(id);

    const additional = await this.additionalRepository.findOne({
      where: {
        user
      }
    });
    if (additional) {
      return additional;
    } else {
      return undefined;
    }
  }

  /**
   * Returns user's new notification's
   */
  async getNotifications(
    id: number,
    take: number
  ): Promise<Array<Transaction> | undefined> {
    const userService = new UserService();
    const recipient = await userService.getById(id);

    const transactions = await this.transactionRepository.find({
      take,
      where: {
        recipient,
        authorizationStatus: true
      },
      relations: ["currency", "sender", "sender.user"],
      order: {
        createdDate: "DESC"
      }
    });

    if (transactions) {
      return transactions;
    } else {
      return undefined;
    }
  }
}
