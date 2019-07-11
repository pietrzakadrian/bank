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
   * Creates a new Transaction into the database.
   */
  async insert(data: Transaction): Promise<Transaction> {
    this.logger.info("Create a new transaction", data);
    const newTransaction = this.transactionRepository.create(data);
    return await this.transactionRepository.save(newTransaction);
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
   * Returns the last four transactions received to the user
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

  /**
   * Returns the last transactions sent by the user
   */
  async getTransactions(id: number, skip: number): Promise<object | undefined> {
    const userService = new UserService();
    const user = await userService.getById(id);

    const transactions = await this.transactionRepository.findAndCount({
      skip,
      take: 12,
      where: [
        { sender: user, authorizationStatus: true },
        { recipient: user, authorizationStatus: true }
      ],
      relations: [
        "currency",
        "recipient",
        "recipient.user",
        "sender",
        "sender.user"
      ],
      order: {
        createdDate: "DESC"
      }
    });

    if (transactions) {
      const transformTransactions = [
        transactions[0].map(({ ...transaction }) => ({
          amountMoney: transaction.amountMoney,
          currency: transaction.currency.name,
          createdData: transaction.createdDate,
          transferTitle: transaction.transferTitle,
          sender: {
            id: transaction.sender.user.id,
            name: transaction.sender.user.name,
            surname: transaction.sender.user.surname,
            accountBill: transaction.sender.accountBill
          },
          recipient: {
            id: transaction.recipient.user.id,
            name: transaction.recipient.user.name,
            surname: transaction.recipient.user.surname,
            accountBill: transaction.recipient.accountBill
          }
        })),
        { count: transactions[1] }
      ];
      return transformTransactions;
    } else {
      return undefined;
    }
  }

  /**
   * Returns the last transaction's key
   */
  async getAuthorizationKey(
    senderId: number,
    recipientId: number
  ): Promise<Object | undefined> {
    const userService = new UserService();
    const sender = await userService.getById(senderId);
    const recipient = await userService.getById(recipientId);

    const transaction = await this.transactionRepository.findOne({
      where: {
        sender,
        recipient
      },
      order: {
        createdDate: "DESC"
      }
    });

    if (transaction) {
      return transaction.authorizationKey;
    } else {
      return undefined;
    }
  }

  /**
   * Returns authorization key for payments
   */
  generateAuthorizationKey(): string {
    let authorizationKey = "";
    const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

    for (let i = 0; i < 5; i++) {
      authorizationKey += possible.charAt(
        Math.floor(Math.random() * possible.length)
      );
    }

    return authorizationKey;
  }
}
