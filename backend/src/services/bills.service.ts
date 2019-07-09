import { getManager, Repository, Like, Not } from "typeorm";
import { Bill } from "../entities/bill.entity";
import { User } from "../entities/user.entity";
import { Logger, ILogger } from "../utils/logger";
import { Currency } from "../entities/currency.entity";
import { UserService } from "./users.service";

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
    console.log("newBill", newBill);

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
    const bill = await this.billRepository.findOne({
      where: {
        user: id
      },
      relations: ["user", "currency"]
    });

    console.log();

    if (bill) {
      return bill;
    } else {
      return undefined;
    }
  }

  /**
   * Returns a bills by account bill
   */
  async getByAccountBill(
    accountBill: string,
    id?: number
  ): Promise<Object | undefined> {
    const userService = new UserService();
    const user = await userService.getById(id);

    const bills = await this.billRepository.find({
      select: ["accountBill"],
      where: {
        accountBill: Like(`${accountBill}%`),
        user: Not(`${user.id}`)
      },
      relations: ["user"]
    });

    if (bills) {
      return bills;
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
    const isAccountBill = await this.getByAccountBill(accountBill);

    return isAccountBill ? await this.generateAccountBill() : accountBill;
  }

  /**
   * Returns a bill by userId
   */
  async isAmountMoney(amountMoney: number, id: number): Promise<boolean> {
    const bill = await this.billRepository.findOne({
      where: {
        user: id
      }
    });

    if (bill.availableFunds >= amountMoney && amountMoney > 0) {
      return true;
    } else {
      return false;
    }
  }
}
