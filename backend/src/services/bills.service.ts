import { getManager, Repository, Like } from "typeorm";
import { Bill } from "../entities/bill.entity";
import { User } from "../entities/user.entity";
import { Logger, ILogger } from "../utils/logger";
import { Currency } from "../entities/currency.entity";

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
  async getByUserId(id: number): Promise<Bill | undefined> {
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
   * Returns a bill by account bill
   */
  //todo: nie pozwol na wyszukanie swojego numeru konta
  async getByAccountBill(accountBill: string): Promise<Bill | undefined> {
    const bills = await this.billRepository.find({
      where: {
        accountBill: Like(`${accountBill}%`)
      },
      relations: ["user"]
    });
    if (bills) {
      return bills[0];
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
}
