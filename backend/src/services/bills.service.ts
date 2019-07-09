import { getManager, Repository } from "typeorm";
import { Bill } from "../entities/bill.entity";
import { Logger, ILogger } from "../utils/logger";

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
  async insert(data: Bill): Promise<Bill> {
    this.logger.info("Create a new bill", data);
    const newBill = this.billRepository.create(data);
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
    const bill = await this.billRepository.find({
      where: {
        user: id
      }
    });

    console.log(bill);

    if (bill && bill.length > 0) {
      return bill[0];
    } else {
      return undefined;
    }
  }

  /**
   * Returns a bill by account bill
   */
  async getByAccountBill(accountBill: string): Promise<Bill | undefined> {
    const bill = await this.billRepository.find({
      where: {
        accountBill
      }
    });
    if (bill && bill.length > 0) {
      return bill[0];
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
