import { getManager, Repository } from "typeorm";
import { Currency } from "../entities/currency.entity";
import { Logger, ILogger } from "../utils/logger";

export class CurrencyService {
  currencyRepository: Repository<Currency>;
  logger: ILogger;

  constructor() {
    this.logger = new Logger(__filename);
    this.currencyRepository = getManager().getRepository(Currency);
  }

  /**
   * Returns array of all currency from db
   */
  async getAll(): Promise<Currency[]> {
    return await this.currencyRepository.find();
  }
}
