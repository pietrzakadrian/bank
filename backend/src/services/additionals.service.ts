import { getManager, Repository, Between } from "typeorm";
import { Logger, ILogger } from "../utils/logger";
import { Decimal } from "decimal.js";

// Import Services
import { UserService } from "./users.service";
import { BillService } from "./bills.service";
import { CurrencyService } from "./currency.service";
import { TransactionService } from "./transactions.service";

// Import Entities
import { Additional } from "../entities/additional.entity";
import { Transaction } from "../entities/transaction.entity";
import { User } from "../entities/user.entity";
import { Currency } from "../entities/currency.entity";

export class AdditionalService {
  additionalRepository: Repository<Additional>;
  transactionRepository: Repository<Transaction>;
  userRepository: Repository<User>;
  logger: ILogger;

  constructor() {
    this.logger = new Logger(__filename);
    this.additionalRepository = getManager().getRepository(Additional);
    this.transactionRepository = getManager().getRepository(Transaction);
    this.userRepository = getManager().getRepository(User);
  }

  /**
   * Creates an instance of Additional.
   */
  instantiate(data: Object): Additional | undefined {
    return this.additionalRepository.create(data);
  }

  /**
   * Inserts a new Additional into the database.
   */
  async insert(data: Additional): Promise<Additional> {
    this.logger.info("Create a new additional", data);
    const newAdditional = this.additionalRepository.create(data);
    return await this.additionalRepository.save(newAdditional);
  }

  /**
   * Unsets user's all notifications
   */
  async unsetNotifications(user: User): Promise<object> {
    try {
      return await this.additionalRepository.update(
        { user },
        {
          notificationCount: 0,
          notificationStatus: false
        }
      );
    } catch (error) {
      return Promise.reject(error);
    }
  }

  /**
   * Returns boolean that user has a new notifiations
   */
  async isNotification(user: User): Promise<Additional> {
    const userId: number = this.userRepository.getId(user);

    try {
      const isNotification = await this.additionalRepository
        .createQueryBuilder("additional")
        .where("additional.userId = :senderId", {
          userId
        })
        .select("additional.notificationStatus")
        .getOne();

      return isNotification;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  /**
   * Returns a additional by given id
   */
  async getById(id: string | number): Promise<Additional> {
    this.logger.info("Fetching additional by id: ", id);
    if (id) {
      return await this.additionalRepository.findOne(id);
    }
    return Promise.reject(false);
  }

  /**
   * Returns a additiona by User
   */
  async getByUser(user: User): Promise<Additional | undefined> {
    try {
      const additional: Additional = await this.additionalRepository.findOne({
        where: user
      });

      if (additional) {
        return additional;
      } else {
        return undefined;
      }
    } catch (error) {
      return Promise.reject(error);
    }
  }

  /**
   * Returns user's new notification's
   */
  async getNotifications(
    recipient: User,
    limit: number
  ): Promise<Array<Transaction> | undefined> {
    const recipientId: number = this.userRepository.getId(recipient);

    try {
      const transactions = await this.transactionRepository
        .createQueryBuilder("transaction")
        .leftJoinAndSelect("transaction.currency", "currency")
        .leftJoinAndSelect("transaction.sender", "sender")
        .leftJoinAndSelect("sender.user", "user")
        .select([
          "transaction.createdDate",
          "transaction.amountMoney",
          "currency.name",
          "user.name",
          "user.surname"
        ])
        .where("transaction.recipientId = :recipientId", { recipientId })
        .andWhere("transaction.authorizationStatus = :authorizationStatus", {
          authorizationStatus: true
        })
        .orderBy("transaction.createdDate", "DESC")
        .limit(limit)
        .execute();

      if (transactions) {
        return transactions;
      } else {
        return undefined;
      }
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async setWidgetStatus(user: User): Promise<object> {
    const transactionService = new TransactionService();
    const currencyService = new CurrencyService();
    const userId: number = this.userRepository.getId(user);
    const today: Date = new Date();
    const previousMonth: Date = new Date(
      new Date().setMonth(today.getMonth() - 1)
    );

    const transactions = await transactionService.getTransactions(
      user,
      null,
      null,
      previousMonth,
      today
    );

    if (!transactions) return;

    let transferExchangeRate: number = null;
    let convertedAmountMoney: number = null;
    let availableFunds: number = 0;
    let accountBalanceHistory: string = "0";
    let incomingTransfersSum: number = 0;
    let outgoingTransfersSum: number = 0;
    const userCurrency: Currency = await currencyService.getByUser(user);
    const userCurrencyId: number = userCurrency.id;
    const userExchangeRate: number = userCurrency.exchangeRate;
    const isUserCurrencyMain: boolean = userCurrency.main;

    for await (const transaction of transactions.reverse()) {
      if (transaction.sender_id === userId) {
        if (transaction.currency_id === userCurrencyId) {
          outgoingTransfersSum += parseFloat(
            transaction.transaction_amountMoney
          );

          console.log("outgoingTransfersSum1", outgoingTransfersSum);

          availableFunds -= transaction.transaction_amountMoney;
          accountBalanceHistory += `,${availableFunds.toFixed(2)}`;
        } else {
          transferExchangeRate = await currencyService.getExchangeRateById(
            transaction.currency_id
          );

          if (isUserCurrencyMain) {
            convertedAmountMoney =
              parseFloat(transaction.transaction_amountMoney) /
              transferExchangeRate;

            outgoingTransfersSum += convertedAmountMoney;
            console.log("outgoingTransfersSum2", outgoingTransfersSum);
            availableFunds -= convertedAmountMoney;
            accountBalanceHistory += `,${availableFunds.toFixed(2)}`;
          } else {
            convertedAmountMoney =
              (parseFloat(transaction.transaction_amountMoney) /
                transferExchangeRate) *
              userExchangeRate;

            outgoingTransfersSum += convertedAmountMoney;
            console.log("outgoingTransfersSum3", outgoingTransfersSum);
            availableFunds -= convertedAmountMoney;
            accountBalanceHistory += `,${availableFunds.toFixed(2)}`;
          }
        }
      }

      if (transaction.recipient_id === userId) {
        if (transaction.currency_id === userCurrencyId) {
          incomingTransfersSum += transaction.transaction_amountMoney;

          availableFunds += parseFloat(transaction.transaction_amountMoney);
          accountBalanceHistory += `,${availableFunds.toFixed(2)}`;
        } else {
          transferExchangeRate = await currencyService.getExchangeRateById(
            transaction.currency_id
          );

          if (isUserCurrencyMain) {
            convertedAmountMoney =
              parseFloat(transaction.transaction_amountMoney) /
              transferExchangeRate;

            incomingTransfersSum += convertedAmountMoney;
            availableFunds += convertedAmountMoney;
            accountBalanceHistory += `,${availableFunds.toFixed(2)}`;
          } else {
            convertedAmountMoney =
              (parseFloat(transaction.transaction_amountMoney) /
                transferExchangeRate) *
              userExchangeRate;

            incomingTransfersSum += convertedAmountMoney;
            availableFunds += convertedAmountMoney;
            accountBalanceHistory += `,${availableFunds.toFixed(2)}`;
          }
        }
      }
    }

    console.log("accountBalanceHistory", accountBalanceHistory);
    console.log("outgoingTransfersSum", outgoingTransfersSum);
    console.log("incomingTransfersSum", incomingTransfersSum);

    return await this.additionalRepository.update(
      { user },
      { accountBalanceHistory, outgoingTransfersSum, incomingTransfersSum }
    );
  }
}
