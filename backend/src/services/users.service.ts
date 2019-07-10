import { getManager, Repository } from "typeorm";
import { User } from "../entities/user.entity";
import { Logger, ILogger } from "../utils/logger";

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
    this.logger.info("Fetching user by id: ", id);
    if (id) {
      return await this.userRepository.findOne(id);
    }
    return Promise.reject(false);
  }

  /**
   * Returns a user by email
   */
  async getByEmail(email: string): Promise<User | undefined> {
    const user = await this.userRepository.findOne({
      where: {
        email: email
      }
    });
    if (user) {
      return user;
    } else {
      return undefined;
    }
  }

  /**
   * Returns a user by login
   */
  async getByLogin(login: number): Promise<User | undefined> {
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
   * Updates a user
   */
  // async update(user: User): Promise<User | undefined> {
  //   try {
  //     const updatedUser = await this.userRepository.update(user);
  //     return updatedUser;
  //   } catch (error) {
  //     return Promise.reject(error);
  //   }
  // }

  /**
   * Updates the last failed logged date
   */
  async setLastFailedLoggedDate(login: number): Promise<Object | undefined> {
    try {
      return await this.userRepository.update(
        { login },
        {
          lastFailedLoggedDate: new Date()
        }
      );
    } catch (error) {
      return Promise.reject(error);
    }
  }

  /**
   * Updates the last present logged date
   */
  async setLastPresentLoggedDate(login: number): Promise<Object | undefined> {
    try {
      return await this.userRepository.update(
        { login },
        {
          lastPresentLoggedDate: new Date()
        }
      );
    } catch (error) {
      return Promise.reject(error);
    }
  }

  /**
   * Updates the last succesful logged date
   */
  async setLastSuccessfulLoggedDate(id: number): Promise<Object | undefined> {
    try {
      const user = await this.userRepository.findOne({
        where: {
          id
        }
      });

      return await this.userRepository.update(
        { id },
        {
          lastSuccessfulLoggedDate: user.lastPresentLoggedDate
        }
      );
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
