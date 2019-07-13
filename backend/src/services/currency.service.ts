import { getManager, Repository } from "typeorm";
import { Logger, ILogger } from "../utils/logger";

// Import Entities
import { Currency } from "../entities/currency.entity";

export class CurrencyService {
  currencyRepository: Repository<Currency>;
  logger: ILogger;

  constructor() {
    this.logger = new Logger(__filename);
    this.currencyRepository = getManager().getRepository(Currency);
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
    this.logger.info("Fetching user by id: ", id);
    if (id) {
      return await this.currencyRepository.findOne(id);
    }
    return Promise.reject(false);
  }

  /**
   * Returns a additiona by userId
   */
  async getByUserId(id: number): Promise<Currency | undefined> {
    const userService = new CurrencyService();
    const user = await userService.getById(id);

    const additional = await this.currencyRepository.findOne({
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
   * Returns a currency exchange rate by given id
   */
  async getExchangeRate(id: number | string): Promise<number> {
    const currencyService = new CurrencyService();

    const currency = await this.currencyRepository.findOne({
      where: {
        currency: await currencyService.getById(id)
      }
    });

    if (currency) {
      return currency.exchangeRate;
    }
    return Promise.reject(false);
  }

  /**
   * Returns a boolean that currency is main
   */
  async isCurrencyMain(id: number | string): Promise<boolean> {
    const currencyService = new CurrencyService();

    const currency = await this.currencyRepository.findOne({
      where: {
        currency: await currencyService.getById(id)
      }
    });

    if (currency.main) {
      return true;
    } else {
      return false;
    }
  }
}
