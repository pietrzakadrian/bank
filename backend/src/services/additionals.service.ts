import { getManager, Repository, Between } from "typeorm";
import { Logger, ILogger } from "../utils/logger";
import { Decimal } from "decimal.js";

// Import Services
import { CurrencyService } from "./currency.service";
import { TransactionService } from "./transactions.service";
import { ConfigService } from "./config.service";
import { UserService } from "./users.service";

// Import Entities
import { Additional } from "../entities/additional.entity";
import { Transaction } from "../entities/transaction.entity";
import { User } from "../entities/user.entity";
import { Currency } from "../entities/currency.entity";
import { Message } from "../entities/message.entity";
import { Language } from "../entities/language.entity";

export class AdditionalService {
  additionalRepository: Repository<Additional>;
  transactionRepository: Repository<Transaction>;
  userRepository: Repository<User>;
  messageRepository: Repository<Message>;
  languageRepository: Repository<Language>;
  logger: ILogger;

  constructor() {
    this.logger = new Logger(__filename);
    this.additionalRepository = getManager().getRepository(Additional);
    this.transactionRepository = getManager().getRepository(Transaction);
    this.messageRepository = getManager().getRepository(Message);
    this.userRepository = getManager().getRepository(User);
    this.languageRepository = getManager().getRepository(Language);
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
        { notificationCount: 0, notificationStatus: false }
      );
    } catch (error) {
      return Promise.reject(error);
    }
  }

  /**
   * Unsets user's all messagess
   */
  async unsetMessages(user: User): Promise<object> {
    try {
      return await this.additionalRepository.update(
        { user },
        { messageStatus: false }
      );
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
   * Returns user's new notifications
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

  /**
   * Returns user's messages
   */
  async getMessages(
    recipient: User,
    language: Language
  ): Promise<Array<Message> | undefined> {
    const recipientId: number = this.userRepository.getId(recipient);
    const languageId: number = this.languageRepository.getId(language);

    try {
      const messages = await this.messageRepository
        .createQueryBuilder("message")
        .leftJoinAndSelect("message.name", "config")
        .leftJoinAndSelect(
          "templates",
          "template",
          "template.nameId = config.id",
          { languageId }
        )
        .leftJoinAndSelect("users", "user", "user.id = message.senderId")
        .where("message.recipientId = :recipientId", { recipientId })
        .andWhere("template.languageId = :languageId", { languageId })
        .select([
          "message.createdDate",
          "template.subject",
          "template.content",
          "template.actions",
          "user.name",
          "user.surname"
        ])
        .orderBy("message.createdDate", "DESC")
        .execute();

      if (messages) {
        return messages;
      } else {
        return undefined;
      }
    } catch (error) {
      return Promise.reject(error);
    }
  }

  /**
   * Sets user's widget status
   */
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
    let availableFunds: Decimal = new Decimal(0);
    let accountBalanceHistory: string = "0";
    let incomingTransfersSum: number = 0;
    let outgoingTransfersSum: number = 0;
    const userCurrency: Currency = await currencyService.getByUser(user);
    const userCurrencyId: number = userCurrency.id;
    const userExchangeRate: number = userCurrency.exchangeRate;
    const isUserCurrencyMain: boolean = userCurrency.main;

    for await (const transaction of transactions) {
      if (transaction.sender_id === userId) {
        if (transaction.currency_id === userCurrencyId) {
          outgoingTransfersSum = Decimal.add(
            outgoingTransfersSum,
            transaction.transaction_amountMoney
          ).toNumber();

          availableFunds = Decimal.sub(
            availableFunds,
            transaction.transaction_amountMoney
          );

          accountBalanceHistory += `,${availableFunds.toFixed(2)}`;
        } else {
          transferExchangeRate = await currencyService.getExchangeRateById(
            transaction.currency_id
          );

          if (isUserCurrencyMain) {
            convertedAmountMoney = Decimal.div(
              transaction.transaction_amountMoney,
              transferExchangeRate
            ).toNumber();

            outgoingTransfersSum = Decimal.add(
              outgoingTransfersSum,
              convertedAmountMoney
            ).toNumber();

            availableFunds = Decimal.sub(availableFunds, convertedAmountMoney);

            accountBalanceHistory += `,${availableFunds.toFixed(2)}`;
          } else {
            convertedAmountMoney = Decimal.div(
              transaction.transaction_amountMoney,
              transferExchangeRate
            )
              .mul(userExchangeRate)
              .toNumber();

            outgoingTransfersSum = Decimal.add(
              outgoingTransfersSum,
              convertedAmountMoney
            ).toNumber();

            availableFunds = Decimal.sub(availableFunds, convertedAmountMoney);

            accountBalanceHistory += `,${availableFunds.toFixed(2)}`;
          }
        }
      }

      if (transaction.recipient_id === userId) {
        if (transaction.currency_id === userCurrencyId) {
          incomingTransfersSum = Decimal.add(
            incomingTransfersSum,
            transaction.transaction_amountMoney
          ).toNumber();

          availableFunds = Decimal.add(
            availableFunds,
            transaction.transaction_amountMoney
          );

          accountBalanceHistory += `,${availableFunds.toFixed(2)}`;
        } else {
          transferExchangeRate = await currencyService.getExchangeRateById(
            transaction.currency_id
          );

          if (isUserCurrencyMain) {
            convertedAmountMoney = Decimal.div(
              transaction.transaction_amountMoney,
              transferExchangeRate
            ).toNumber();

            incomingTransfersSum = Decimal.add(
              incomingTransfersSum,
              convertedAmountMoney
            ).toNumber();
            availableFunds = Decimal.add(availableFunds, convertedAmountMoney);

            accountBalanceHistory += `,${availableFunds.toFixed(2)}`;
          } else {
            convertedAmountMoney = Decimal.div(
              transaction.transaction_amountMoney,
              transferExchangeRate
            )
              .mul(userExchangeRate)
              .toNumber();

            incomingTransfersSum = Decimal.add(
              incomingTransfersSum,
              convertedAmountMoney
            ).toNumber();

            availableFunds = Decimal.add(availableFunds, convertedAmountMoney);

            accountBalanceHistory += `,${availableFunds.toFixed(2)}`;
          }
        }
      }
    }

    return await this.additionalRepository.update(
      { user },
      { accountBalanceHistory, outgoingTransfersSum, incomingTransfersSum }
    );
  }

  /**
   * Sets user's new notification
   */
  async setNotification(user: User): Promise<object> {
    try {
      const userAdditional: Additional = await this.additionalRepository.findOne(
        { where: { user } }
      );

      if (!userAdditional) return;

      const notificationCount: number = userAdditional.notificationCount;

      return await this.additionalRepository.update(
        { user },
        {
          notificationCount: notificationCount + 1,
          notificationStatus: true
        }
      );
    } catch (error) {
      return Promise.reject(error);
    }
  }

  /**
   * Sets user's new message
   */
  async setMessage(user: User): Promise<object> {
    const additionalService = new AdditionalService();
    const userAdditional = await additionalService.getByUser(user);

    try {
      const messageCount: number = userAdditional.messageCount;
      return await this.additionalRepository.update(
        { user },
        {
          messageCount: messageCount + 1,
          messageStatus: true
        }
      );
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
