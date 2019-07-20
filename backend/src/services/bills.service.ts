import { getManager, Repository, Like, Not } from "typeorm";
import { Logger, ILogger } from "../utils/logger";
import { Decimal } from "decimal.js";

// Import Services
import { CurrencyService } from "./currency.service";
import { UserService } from "./users.service";

// Import Entities
import { Currency } from "../entities/currency.entity";
import { Bill } from "../entities/bill.entity";
import { User } from "../entities/user.entity";

export class BillService {
  billRepository: Repository<Bill>;
  currencyRepository: Repository<Currency>;
  userRepository: Repository<User>;
  logger: ILogger;

  constructor() {
    this.logger = new Logger(__filename);
    this.billRepository = getManager().getRepository(Bill);
    this.currencyRepository = getManager().getRepository(Currency);
    this.userRepository = getManager().getRepository(User);
  }

  /**
   * Creates an instance of Bill.
   */
  instantiate(data: Object): Bill | undefined {
    return this.billRepository.create(data);
  }

  /**
   * Inserts a new Bill into the database.
   */
  async insert(bill: Bill): Promise<Bill> {
    this.logger.info("Create a new bill", bill);
    const newBill = this.billRepository.create(bill);
    return await this.billRepository.save(newBill);
  }

  /**
   * Returns a bill by given id
   */
  async getById(id: string | number): Promise<Bill> {
    this.logger.info("Fetching bill by id: ", id);
    if (id) {
      return await this.billRepository.findOne(id);
    }
    return Promise.reject(false);
  }

  /**
   * Returns a bill by userId
   */
  async getByUser(user: User): Promise<Bill | undefined> {
    try {
      const bill: Bill = await this.billRepository.findOne({
        where: { user },
        relations: ["user", "currency"]
      });
      if (bill) {
        return bill;
      } else {
        return undefined;
      }
    } catch (error) {
      return Promise.reject(error);
    }
  }

  /**
   * Returns a bill by account Bill
   */
  async getByAccountBill(accountBill: string): Promise<Bill | undefined> {
    console.log(accountBill);
    try {
      const bill: Bill = await this.billRepository.findOne({
        where: { accountBill },
        relations: ["user"]
      });

      if (bill) {
        console.log(bill);
        return bill;
      } else {
        return undefined;
      }
    } catch (error) {
      return Promise.reject(error);
    }
  }

  /**
   * Returns a bills by account bill
   */
  async getUsersByAccountBill(
    accountBill: string,
    user?: User
  ): Promise<Array<Bill> | undefined> {
    const userId: User | undefined = user
      ? this.userRepository.getId(user)
      : undefined;

    try {
      const bills: Bill[] | undefined = await this.billRepository
        .createQueryBuilder("bill")
        .leftJoinAndSelect("bill.user", "user")
        .where("bill.accountBill LIKE :accountBill", {
          accountBill: `${accountBill}%`
        })
        .andWhere("bill.userId != :userId", { userId: userId ? userId : 0 })
        .select(["bill.accountBill", "user.id", "user.name", "user.surname"])
        .execute();

      if (bills) {
        return bills;
      } else {
        return undefined;
      }
    } catch (error) {
      return Promise.reject(error);
    }
  }

  /**
   * Generate unique account bill
   */
  async generateAccountBill(): Promise<string> {
    const firstPart: number = Math.floor(100000000 + Math.random() * 900000000);
    const secoundPart: number = Math.floor(
      100000000 + Math.random() * 900000000
    );
    const thirdPart: number = 22199722;

    const accountBill: string = `${firstPart}${secoundPart}${thirdPart}`;
    const isAccountBill: Bill[] = await this.getUsersByAccountBill(accountBill);

    return isAccountBill.length
      ? await this.generateAccountBill()
      : accountBill;
  }

  /**
   * Returns a bill by userId
   */
  async isAmountMoney(amountMoney: Decimal, user: User): Promise<boolean> {
    const bill: Bill = await this.billRepository.findOne({
      where: {
        user
      }
    });

    const availableFunds: Decimal = new Decimal(bill.availableFunds);

    if (
      availableFunds.greaterThanOrEqualTo(amountMoney) &&
      amountMoney.greaterThan(0)
    ) {
      return true;
    } else {
      return false;
    }
  }

  /**
   * Updates a bill
   */
  async update(bill: Bill): Promise<User | undefined> {
    try {
      const updatedBill = await this.userRepository.save(bill);
      return updatedBill;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  /**
   * Returns substract Amount Money by User
   */
  async subAmountMoney(amountMoney: number, user: User): Promise<object> {
    try {
      const recipientBill: Bill = await this.getByUser(user);
      const recipientAvailableFunds: number = new Decimal(
        recipientBill.availableFunds
      ).toNumber();

      const availableFunds = Decimal.sub(
        recipientAvailableFunds,
        amountMoney
      ).toNumber();

      return await this.billRepository.update({ user }, { availableFunds });
    } catch (error) {
      return Promise.reject(error);
    }
  }

  /**
   * Returns add Amount Money by User
   */
  async addAmountMoney(
    amountMoney: number,
    user: User,
    currency: Currency
  ): Promise<object> {
    const currencyService = new CurrencyService();

    try {
      const recipientCurrency: Currency = await currencyService.getByUser(user);
      const recipientBill: Bill = await this.getByUser(user);
      const recipientAvailableFunds: number = recipientBill.availableFunds;
      const recipientCurrencyId: number = recipientCurrency.id;
      const recipientExchangeRate: number = recipientCurrency.exchangeRate;
      const isRecipientCurrencyMain: boolean = recipientCurrency.main;
      const transferCurrencyId: number = currency.id;
      const transferExchangeRate: number = currency.exchangeRate;

      if (transferCurrencyId === recipientCurrencyId) {
        const availableFunds: number = Decimal.add(
          recipientAvailableFunds,
          amountMoney
        ).toNumber();

        return await this.billRepository.update({ user }, { availableFunds });
      }

      if (isRecipientCurrencyMain) {
        const convertedAmountMoney: number = Decimal.div(
          amountMoney,
          transferExchangeRate
        ).toNumber();
        const availableFunds: number = Decimal.add(
          recipientAvailableFunds,
          convertedAmountMoney
        ).toNumber();

        return await this.billRepository.update({ user }, { availableFunds });
      }

      const convertedAmountMoney: number = Decimal.div(
        amountMoney,
        transferExchangeRate
      )
        .mul(recipientExchangeRate)
        .toNumber();
      const availableFunds: number = Decimal.add(
        recipientAvailableFunds,
        convertedAmountMoney
      ).toNumber();

      return await this.billRepository.update({ user }, { availableFunds });
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
