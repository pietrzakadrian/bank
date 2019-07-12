import { getManager, Repository, Like, Not } from "typeorm";
import { Bill } from "../entities/bill.entity";
import { Logger, ILogger } from "../utils/logger";
import { Currency } from "../entities/currency.entity";
import { UserService } from "./users.service";
import { Decimal } from "decimal.js";
import { CurrencyService } from "./currency.service";

export class BillService {
  billRepository: Repository<Bill>;
  logger: ILogger;

  constructor() {
    this.logger = new Logger(__filename);
    this.billRepository = getManager().getRepository(Bill);
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
  async getByUserId(id: string | number): Promise<Bill | undefined> {
    const userService = new UserService();
    const user = await userService.getById(id);

    const bill = await this.billRepository.findOne({
      where: {
        user
      },
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
      where: {
        accountBill
      },
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
    id?: number
  ): Promise<Array<object> | undefined> {
    const userService = new UserService();
    const user = id ? await userService.getById(id) : undefined;

    const bills: Bill[] = await this.billRepository.find({
      select: ["accountBill"],
      where: [
        {
          accountBill: Like(`${accountBill}%`),
          user: Not(`${user}`)
        }
      ],
      relations: ["user"]
    });

    if (bills) {
      const transformBills = bills.map(({ ...bill }) => ({
        accountBill: bill.accountBill,
        user: {
          name: bill.user.name,
          surname: bill.user.surname
        }
      }));

      return transformBills;
    } else {
      return undefined;
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
  async isAmountMoney(amountMoney: Decimal, id: number): Promise<boolean> {
    const userService = new UserService();
    const user = await userService.getById(id);

    const bill = await this.billRepository.findOne({
      where: {
        user
      }
    });

    if (
      bill.availableFunds.greaterThanOrEqualTo(amountMoney) &&
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
  async subAmountMoney(amountMoney: Decimal, id: number) {
    const userService = new UserService();
    const user = await userService.getById(id);
    const userId = user.id;

    try {
      const bill = await this.getByUserId(userId);

      const availableFunds: Decimal = Decimal.sub(
        bill.availableFunds,
        amountMoney
      );

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
  async addAmountMoney(amountMoney: Decimal, id: number, currency: Currency) {
    const userService = new UserService();
    const currencyService = new CurrencyService();
    const user = await userService.getById(id);
    const userId = user.id;
    const recipientCurrency = await currencyService.getByUserId(userId);
    const recipientCurrencyMain = recipientCurrency.main;
    const recipientExchangeRate = recipientCurrency.exchangeRate;

    try {
      const bill = await this.getByUserId(userId);

      if (bill.currency === currency) {
        const availableFunds: Decimal = Decimal.add(
          bill.availableFunds,
          amountMoney
        );

        return await this.billRepository.update(
          { user },
          {
            availableFunds
          }
        );
      }

      if (recipientCurrencyMain) {
        const convertedAmountMoney: Decimal = Decimal.div(
          amountMoney,
          recipientExchangeRate
        );
        const availableFunds: Decimal = Decimal.add(
          bill.availableFunds,
          convertedAmountMoney
        );

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
      const availableFunds: Decimal = Decimal.add(
        bill.availableFunds,
        convertedAmountMoney
      );

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
