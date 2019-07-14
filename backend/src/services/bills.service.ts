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
  userRepository: Repository<User>;
  logger: ILogger;

  constructor() {
    this.logger = new Logger(__filename);
    this.billRepository = getManager().getRepository(Bill);
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
    const bill = await this.billRepository.findOne({
      where: { user },
      relations: ["user", "currency"]
    });
    if (bill) {
      return bill;
    } else {
      return undefined;
    }
  }

  /**
   * Returns a bill by userId
   */
  async getByAccountBill(
    accountBill: string | number
  ): Promise<Bill | undefined> {
    const bill = await this.billRepository.findOne({
      where: { accountBill },
      relations: ["user"]
    });

    if (bill) {
      return bill;
    } else {
      return undefined;
    }
  }

  /**
   * Returns a bills by account bill
   */
  async getUsersByAccountBill(
    accountBill: string,
    user?: User
  ): Promise<Array<Bill> | undefined> {
    const userId = user ? this.userRepository.getId(user) : undefined;

    try {
      const bills = await this.billRepository
        .createQueryBuilder("bill")
        .leftJoinAndSelect("bill.user", "user")
        .where("bill.accountBill LIKE :accountBill", {
          accountBill: `${accountBill}%`
        })
        .andWhere("bill.userId != :userId", { userId: userId ? userId : 0 })
        .select(["bill.accountBill", "user.name", "user.surname"])
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
    const firstPart = Math.floor(100000000 + Math.random() * 900000000);
    const secoundPart = Math.floor(100000000 + Math.random() * 900000000);
    const thirdPart = 22199722;

    const accountBill = `${firstPart}${secoundPart}${thirdPart}`;
    const isAccountBill = await this.getUsersByAccountBill(accountBill);

    return isAccountBill.length
      ? await this.generateAccountBill()
      : accountBill;
  }

  /**
   * Returns a bill by userId
   */
  async isAmountMoney(amountMoney: Decimal, user: User): Promise<boolean> {
    const bill = await this.billRepository.findOne({
      where: {
        user
      }
    });

    const availableFunds = new Decimal(bill.availableFunds);

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
   * Returns substract Amount Money by userId
   */
  async subAmountMoney(amountMoney: Decimal, user: User): Promise<object> {
    try {
      const bill = await this.getByUser(user);

      const availableFunds = Decimal.sub(
        bill.availableFunds,
        amountMoney
      ).toNumber();

      return await this.billRepository.update(
        { user },
        {
          availableFunds
        }
      );
    } catch (error) {
      return Promise.reject(error);
    }
  }

  /**
   * Returns add Amount Money by userId
   */
  async addAmountMoney(
    amountMoney: number,
    user: User,
    currency: Currency
  ): Promise<object> {
    const currencyService = new CurrencyService();
    const recipientCurrency = await currencyService.getByUser(user);
    const recipientExchangeRate = recipientCurrency.exchangeRate;
    const isCurrencyMain = await currencyService.isCurrencyMain(
      recipientCurrency
    );

    try {
      const bill = await this.getByUser(user);

      if (bill.currency === currency) {
        const availableFunds = Decimal.add(
          bill.availableFunds,
          amountMoney
        ).toNumber();

        return await this.billRepository.update(
          { user },
          {
            availableFunds
          }
        );
      }

      if (isCurrencyMain) {
        const convertedAmountMoney: Decimal = Decimal.div(
          amountMoney,
          recipientExchangeRate
        );
        const availableFunds = Decimal.add(
          bill.availableFunds,
          convertedAmountMoney
        ).toNumber();

        return await this.billRepository.update(
          { user },
          {
            availableFunds
          }
        );
      }

      const convertedAmountMoney: Decimal = Decimal.div(
        amountMoney,
        currency.exchangeRate
      ).mul(recipientExchangeRate);

      const availableFunds = Decimal.add(
        bill.availableFunds,
        convertedAmountMoney
      ).toNumber();

      return await this.billRepository.update(
        { user },
        {
          availableFunds
        }
      );
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
