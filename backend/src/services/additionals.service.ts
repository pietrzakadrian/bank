import { getManager, Repository } from "typeorm";
import { Additional } from "../entities/additional.entity";
import { Logger, ILogger } from "../utils/logger";
import { UserService } from "./users.service";

export class AdditionalService {
  additionalRepository: Repository<Additional>;
  logger: ILogger;

  constructor() {
    this.logger = new Logger(__filename);
    this.additionalRepository = getManager().getRepository(Additional);
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
   * Returns a bill by userId
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
}
