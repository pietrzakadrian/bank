import { getManager, Repository } from "typeorm";
import { Logger, ILogger } from "../utils/logger";
import { Decimal } from "decimal.js";

// Import Entities
import { Currency } from "../entities/currency.entity";
import { User } from "../entities/user.entity";
import { Bill } from "../entities/bill.entity";
import { Additional } from "../entities/additional.entity";

// Import Services
import { BillService } from "./bills.service";
import { AdditionalService } from "./additionals.service";

export class CurrencyService {
  currencyRepository: Repository<Currency>;
  userRepository: Repository<User>;
  billRepository: Repository<Bill>;
  additionalRepository: Repository<Additional>;
  logger: ILogger;

  constructor() {
    this.logger = new Logger(__filename);
    this.currencyRepository = getManager().getRepository(Currency);
    this.userRepository = getManager().getRepository(User);
    this.billRepository = getManager().getRepository(Bill);
    this.additionalRepository = getManager().getRepository(Additional);
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
   * Returns a additional by userId
   */
  async getByUser(user: User): Promise<Currency> {
    const userId: number = this.userRepository.getId(user);

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

  async setCurrency(user: User, currency: Currency): Promise<object> {
    return await this.billRepository.update({ user }, { currency });
  }

  /**
   * Returns a currency exchange rate by id
   */
  async getExchangeRateById(id: number): Promise<number> {
    if (id) {
      const currency: Currency = await this.currencyRepository.findOne(id);
      return currency.exchangeRate;
    }
    return Promise.reject(false);
  }

  async setExchangeRate(user: User, currency: Currency): Promise<void> {
    const additionalService = new AdditionalService();
    const billService = new BillService();
    const isUserNewCurrencyMain: boolean = currency.main;
    const newCurrencyExchangeRate: number = currency.exchangeRate;
    const userCurrency: Currency = await this.getByUser(user);
    const userCurrencyId: number = this.currencyRepository.getId(userCurrency);

    try {
      const userBill: Bill = await billService.getByUser(user);
      const userAdditional: Additional = await additionalService.getByUser(
        user
      );
      const userCurrencyExchangeRate: number = await this.getExchangeRateById(
        userCurrencyId
      );
      const userIncomingTransfersSum: number = await userAdditional.incomingTransfersSum;
      const userOutgoingTransfersSum: number = await userAdditional.outgoingTransfersSum;

      const userAvailableFunds: number = userBill.availableFunds;

      if (isUserNewCurrencyMain) {
        const convertedAmountMoney: number = Decimal.div(
          userAvailableFunds,
          userCurrencyExchangeRate
        ).toNumber();
        const convertedIncomingTransfersSum: number = Decimal.div(
          userIncomingTransfersSum,
          userCurrencyExchangeRate
        ).toNumber();
        const convertedOutgoingTransfersSum: number = Decimal.div(
          userOutgoingTransfersSum,
          userCurrencyExchangeRate
        ).toNumber();

        await this.additionalRepository.update(
          { user },
          {
            incomingTransfersSum: convertedIncomingTransfersSum,
            outgoingTransfersSum: convertedOutgoingTransfersSum
          }
        );
        await this.billRepository.update(
          { user },
          { availableFunds: convertedAmountMoney }
        );
      } else {
        const convertedAmountMoney: number = Decimal.div(
          userAvailableFunds,
          userCurrencyExchangeRate
        )
          .mul(newCurrencyExchangeRate)
          .toNumber();

        const convertedIncomingTransfersSum: number = Decimal.div(
          userIncomingTransfersSum,
          userCurrencyExchangeRate
        )
          .mul(newCurrencyExchangeRate)
          .toNumber();

        const convertedOutgoingTransfersSum: number = Decimal.div(
          userOutgoingTransfersSum,
          userCurrencyExchangeRate
        )
          .mul(newCurrencyExchangeRate)
          .toNumber();

        await this.additionalRepository.update(
          { user },
          {
            incomingTransfersSum: convertedIncomingTransfersSum,
            outgoingTransfersSum: convertedOutgoingTransfersSum
          }
        );
        await this.billRepository.update(
          { user },
          { availableFunds: convertedAmountMoney }
        );
      }
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
