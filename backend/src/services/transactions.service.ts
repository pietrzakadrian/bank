import { getManager, Repository } from "typeorm";
import { Logger, ILogger } from "../utils/logger";

// Import Entities
import { Transaction } from "../entities/transaction.entity";
import { User } from "../entities/user.entity";
import { Currency } from "../entities/currency.entity";
import { BillService } from "./bills.service";

export class TransactionService {
  transactionRepository: Repository<Transaction>;
  userRepository: Repository<User>;
  logger: ILogger;

  constructor() {
    this.logger = new Logger(__filename);
    this.transactionRepository = getManager().getRepository(Transaction);
    this.userRepository = getManager().getRepository(User);
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
   * Returns transaction
   */
  async getTransaction(
    amountMoney: number,
    transferTitle: string,
    authorizationKey: string,
    sender: User,
    recipient: User,
    currency: Currency
  ): Promise<Transaction | undefined> {
    try {
      const transaction = await this.transactionRepository.findOne({
        where: {
          amountMoney,
          transferTitle,
          sender,
          recipient,
          authorizationKey,
          authorizationStatus: false,
          currency
        },
        order: {
          createdDate: "DESC"
        }
      });

      if (transaction) {
        return transaction;
      } else {
        return undefined;
      }
    } catch (error) {
      return Promise.reject(false);
    }
  }

  /**
   * Returns the last four transactions sent by the user
   */
  async getSenderTransactions(
    user: User
  ): Promise<Array<Transaction> | undefined> {
    const userId = this.userRepository.getId(user);

    try {
      const transactions = await this.transactionRepository
        .createQueryBuilder("transaction")
        .leftJoinAndSelect("transaction.currency", "currency")
        .leftJoinAndSelect("transaction.recipient", "recipient")
        .leftJoinAndSelect("recipient.user", "user")
        .where("transaction.authorizationStatus = :authorizationStatus", {
          authorizationStatus: true
        })
        .andWhere("transaction.senderId = :userId", { userId })
        .orderBy("transaction.createdDate", "DESC")
        .select([
          "transaction.createdDate",
          "transaction.amountMoney",
          "transaction.transferTitle",
          "currency.name",
          "user.name",
          "user.surname"
        ])
        .limit(4)
        .execute();

      if (transactions) {
        return transactions;
      } else {
        return undefined;
      }
    } catch (error) {
      return Promise.reject(false);
    }
  }

  /**
   * Returns the last four transactions received to the user
   */
  async getRecipientTransactions(
    user: User
  ): Promise<Array<Transaction> | undefined> {
    const userId = this.userRepository.getId(user);

    try {
      const transactions = await this.transactionRepository
        .createQueryBuilder("transaction")
        .leftJoinAndSelect("transaction.currency", "currency")
        .leftJoinAndSelect("transaction.sender", "sender")
        .leftJoinAndSelect("sender.user", "user")
        .where("transaction.authorizationStatus = :authorizationStatus", {
          authorizationStatus: true
        })
        .andWhere("transaction.recipientId = :userId", { userId })
        .orderBy("transaction.createdDate", "DESC")
        .select([
          "transaction.createdDate",
          "transaction.amountMoney",
          "transaction.transferTitle",
          "currency.name",
          "user.name",
          "user.surname"
        ])
        .limit(4)
        .execute();

      if (transactions) {
        return transactions;
      } else {
        return undefined;
      }
    } catch (error) {
      return Promise.reject(false);
    }
  }

  /**
   * Returns the last transactions sent by the user
   */
  async getTransactions(
    user: User,
    offset?: number,
    limit?: number,
    from?: Date,
    to?: Date
  ) {
    const userId = this.userRepository.getId(user);

    try {
      const transactions = await this.transactionRepository
        .createQueryBuilder("transaction")
        .leftJoinAndSelect("transaction.currency", "currency")
        .leftJoinAndSelect("transaction.recipient", "recipientBill")
        .leftJoinAndSelect("recipientBill.user", "recipient")
        .leftJoinAndSelect("transaction.sender", "senderBill")
        .leftJoinAndSelect("senderBill.user", "sender")
        .where("transaction.authorizationStatus = :authorizationStatus", {
          authorizationStatus: true
        })
        .andWhere("transaction.recipientId = :userId", { userId })
        .orWhere("transaction.senderId = :userId", { userId })
        .select([
          "transaction.createdDate",
          "transaction.amountMoney",
          "currency.id",
          "currency.name",
          "senderBill.accountBill",
          "sender.id",
          "sender.name",
          "sender.surname",
          "recipientBill.accountBill",
          "recipient.id",
          "recipient.name",
          "recipient.surname"
        ]);

      if (from && to) {
        return transactions
          .andWhere("transaction.createdDate BETWEEN :from AND :to", {
            from,
            to
          })
          .orderBy("transaction.createdDate", "ASC")
          .execute();
      }

      if (limit) {
        return transactions
          .offset(offset)
          .limit(limit)
          .orderBy("transaction.createdDate", "DESC")
          .getManyAndCount();
      }
    } catch (error) {
      return Promise.reject(false);
    }
  }

  /**
   * Returns the last transaction's key
   */
  async getAuthorizationKey(sender: User, recipient: User): Promise<string> {
    const senderId = this.userRepository.getId(sender);
    const recipientId = this.userRepository.getId(recipient);

    try {
      const authorizationKey = await this.transactionRepository
        .createQueryBuilder("transaction")
        .where("transaction.senderId = :senderId", {
          senderId
        })
        .andWhere("transaction.recipientId = :recipientId", { recipientId })
        .select("transaction.authorizationKey")
        .orderBy("transaction.createdDate", "DESC")
        .getOne();

      if (authorizationKey) {
        return authorizationKey.authorizationKey;
      } else {
        return undefined;
      }
    } catch (error) {
      return Promise.reject(error);
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

  /**
   * Returns boolean that user has already benefited from the promotion
   */
  async hasPromotion(user: User): Promise<boolean> {
    try {
      const hasPromotion = await this.transactionRepository.findOne({
        where: {
          recipient: user,
          authorizationKey: `PROMO10`,
          authorizationStatus: true
        }
      });

      if (hasPromotion) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
