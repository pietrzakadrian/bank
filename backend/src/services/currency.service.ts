import { getManager, Repository } from "typeorm";
import { Logger, ILogger } from "../utils/logger";

// Import Entities
import { Currency } from "../entities/currency.entity";
import { User } from "../entities/user.entity";

export class CurrencyService {
  currencyRepository: Repository<Currency>;
  userRepository: Repository<User>;
  logger: ILogger;

  constructor() {
    this.logger = new Logger(__filename);
    this.currencyRepository = getManager().getRepository(Currency);
    this.userRepository = getManager().getRepository(User);
  }

  /**
   * Inserts a new Currency into the database.
   */
  async insert(currency: Currency): Promise<Currency> {
    this.logger.info("Create a new currency", currency);
    const newCurrency = this.currencyRepository.create(currency);
    return await this.currencyRepository.save(newCurrency);
  }

  /**
   * Returns array of all currency from db
   */
  async getAll(): Promise<Currency[]> {
    return await this.currencyRepository.find();
  }

  /**
   * Returns a currency by given id
   */
  async getById(id: string | number): Promise<Currency> {
    if (id) {
      return await this.currencyRepository.findOne(id);
    }
    return Promise.reject(false);
  }

  /**
   * Returns a additiona by userId
   */
  async getByUser(user: User): Promise<Currency | undefined> {
    const userId = this.userRepository.getId(user);

    try {
      const additional = await this.currencyRepository.findOne(userId);

      if (additional) {
        return additional;
      } else {
        return undefined;
      }
    } catch (error) {
      return Promise.reject(false);
    }
  }

  /**
   * Returns a boolean that currency is main
   */
  async isCurrencyMain(currency: Currency): Promise<boolean> {
    const currencyId = this.currencyRepository.getId(currency);

    try {
      const isCurrencyMain = await this.currencyRepository.findOne(currencyId);

      if (isCurrencyMain) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      return Promise.reject(false);
    }
  }
}
