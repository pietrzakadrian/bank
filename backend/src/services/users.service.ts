import { getManager, Repository } from "typeorm";
import { Logger, ILogger } from "../utils/logger";

// Import Entities
import { User } from "../entities/user.entity";

export class UserService {
  userRepository: Repository<User>;
  logger: ILogger;

  constructor() {
    this.logger = new Logger(__filename);
    this.userRepository = getManager().getRepository(User);
  }

  /**
   * Creates an instance of User.
   */
  instantiate(data: Object): User | undefined {
    return this.userRepository.create(data);
  }

  /**
   * Inserts a new User into the database.
   */
  async insert(data: User): Promise<User> {
    this.logger.info("Create a new user", data);
    const newUser = this.userRepository.create(data);
    return await this.userRepository.save(newUser);
  }

  /**
   * Returns array of all users from db
   */
  async getAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  /**
   * Returns a user by given id
   */
  async getById(id: string | number): Promise<User> {
    if (id) {
      return await this.userRepository.findOne(id);
    }
    return Promise.reject(false);
  }

  /**
   * Returns a user by login
   */
  async getByLogin(login: string | number): Promise<User | undefined> {
    const user = await this.userRepository.findOne({
      where: {
        login
      }
    });
    if (user) {
      return user;
    } else {
      return undefined;
    }
  }

  /**
   * Updates the last failed logged date
   */
  async setLastFailedLoggedDate(user: User): Promise<object> {
    const userId = this.userRepository.getId(user);

    try {
      return await this.userRepository.update(userId, {
        lastFailedLoggedDate: new Date()
      });
    } catch (error) {
      return Promise.reject(error);
    }
  }

  /**
   * Updates the last present logged date
   */
  async setLastPresentLoggedDate(user: User): Promise<object> {
    const userId = this.userRepository.getId(user);

    try {
      return await this.userRepository.update(userId, {
        lastPresentLoggedDate: new Date()
      });
    } catch (error) {
      return Promise.reject(error);
    }
  }

  /**
   * Updates the last succesful logged date
   */
  async setLastSuccessfulLoggedDate(user: User): Promise<object> {
    const userId = this.userRepository.getId(user);

    try {
      return await this.userRepository.update(userId, {
        lastSuccessfulLoggedDate: user.lastPresentLoggedDate
      });
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
