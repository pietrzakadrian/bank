import { getManager, Repository } from 'typeorm';
import { User } from '../entities/User';
import { Logger, ILogger } from '../utils/logger';

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
    this.logger.info('Create a new user', data);
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
    this.logger.info('Fetching user by id: ', id);
    if (id) {
      return await this.userRepository.findOne(id);
    }
    return Promise.reject(false);
  }

  /**
   * Returns a user by email
   */
  async getByEmail(email: string): Promise<User | undefined> {
    const users = await this.userRepository.find({
      where: {
        email: email
      }
    });
    if (users && users.length > 0) {
      return users[0];  // typeorm find() returns array even if response is single object
    } else {
      return undefined;
    }
  }

  /**
   * Updates a user
   */
  async update(user: User): Promise<User | undefined> {
    try {
      const updatedUser = await this.userRepository.save(user);
      return updatedUser;
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
