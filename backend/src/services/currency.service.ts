import { getManager, Repository } from "typeorm";
import { Logger, ILogger } from "../utils/logger";

// Import Entities
import { Currency } from "../entities/currency.entity";
import { User } from "../entities/user.entity";
import { Bill } from "../entities/bill.entity";
import { BillService } from "./bills.service";

export class CurrencyService {
  currencyRepository: Repository<Currency>;
  userRepository: Repository<User>;
  billRepository: Repository<Bill>;
  logger: ILogger;

  constructor() {
    this.logger = new Logger(__filename);
    this.currencyRepository = getManager().getRepository(Currency);
    this.userRepository = getManager().getRepository(User);
    this.billRepository = getManager().getRepository(Bill);
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
  async getByUser(user: User): Promise<Currency> {
    const userId = this.userRepository.getId(user);

    try {
      let currencyBill = await this.billRepository
        .createQueryBuilder("bill")
        .leftJoinAndSelect("bill.currency", "currency")
        .where("bill.userId = :userId", { userId })
        .getOne();

      if (currencyBill) {
        return currencyBill.currency;
      } else {
        return undefined;
      }
    } catch (error) {
      return Promise.reject(error);
    }
  }

  // test
  async getExchangeRateById(id: number) {
    if (id) {
      const currency = await this.currencyRepository.findOne(id);
      return currency.exchangeRate;
    }
    return Promise.reject(false);
  }
}
