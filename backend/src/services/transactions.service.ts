import { getManager, Repository } from "typeorm";
import { Logger, ILogger } from "../utils/logger";
import { Transaction } from "../entities/transaction.entity";
import { UserService } from "./users.service";

export class TransactionService {
  transactionRepository: Repository<Transaction>;
  logger: ILogger;

  constructor() {
    this.logger = new Logger(__filename);
    this.transactionRepository = getManager().getRepository(Transaction);
  }

  /**
   * Returns the last four transactions sent by the user
   */
  async getSenderTransactions(id: number): Promise<Array<object> | undefined> {
    const userService = new UserService();
    const sender = await userService.getById(id);

    const transactions = await this.transactionRepository.find({
      take: 4,
      where: {
        sender,
        authorizationStatus: true
      },
      relations: ["currency", "recipient", "recipient.user"],
      order: {
        createdDate: "DESC"
      }
    });

    if (transactions) {
      const transformTransactions = transactions.map(({ ...transaction }) => ({
        createdDate: transaction.createdDate,
        amountMoney: transaction.amountMoney,
        transferTitle: transaction.transferTitle,
        currency: transaction.currency.name,
        recipient: {
          id: transaction.recipient.id,
          name: transaction.recipient.user.name,
          surname: transaction.recipient.user.surname
        }
      }));

      return transformTransactions;
    } else {
      return undefined;
    }
  }

  /**
   * Returns the last four transactions sent by the user
   */
  async getRecipientTransactions(
    id: number
  ): Promise<Array<object> | undefined> {
    const userService = new UserService();
    const recipient = await userService.getById(id);

    const transactions = await this.transactionRepository.find({
      take: 4,
      where: {
        recipient,
        authorizationStatus: true
      },
      relations: ["currency", "sender", "sender.user"],
      order: {
        createdDate: "DESC"
      }
    });

    if (transactions) {
      const transformTransactions = transactions.map(({ ...transaction }) => ({
        createdDate: transaction.createdDate,
        amountMoney: transaction.amountMoney,
        transferTitle: transaction.transferTitle,
        currency: transaction.currency.name,
        sender: {
          id: transaction.sender.id,
          name: transaction.sender.user.name,
          surname: transaction.sender.user.surname
        }
      }));

      return transformTransactions;
    } else {
      return undefined;
    }
  }
}
