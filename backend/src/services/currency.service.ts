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
   * Returns a currency by given id
   */
  async getById(id: string | number): Promise<Currency> {
    this.logger.info("Fetching additional by id: ", id);
    if (id) {
      return await this.currencyRepository.findOne(id);
    }
    return Promise.reject(false);
  }
}
