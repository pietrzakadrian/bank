import { getManager } from "typeorm";
import { Decimal } from "decimal.js";

// Import Services
import { AdditionalService } from "../services/additionals.service";
import { ConfigService } from "../services/config.service";
import { MessageService } from "../services/messages.service";
import { UserService } from "../services/users.service";
import { BillService } from "../services/bills.service";
import { CurrencyService } from "../services/currency.service";
import { TransactionService } from "../services/transactions.service";

// Import Entities
import { User } from "../entities/user.entity";
import { Message } from "../entities/message.entity";
import { Currency } from "../entities/currency.entity";
import { Transaction } from "../entities/transaction.entity";
import { Bill } from "../entities/bill.entity";
import { Config } from "../entities/config.entity";

/**
 * performs dependencies of the welcome message
 */
export default async function enableWelcomeMessage(user: User) {
  const messageRepository = getManager().getRepository(Message);
  const transactionRepository = getManager().getRepository(Transaction);

  const additionalService = new AdditionalService();
  const configService = new ConfigService();
  const messageService = new MessageService();
  const userService = new UserService();
  const currencyService = new CurrencyService();
  const billService = new BillService();
  const transactionService = new TransactionService();
  const promotionalAmount: number = new Decimal(5).toNumber();
  const transferTitle: string = `Thank you for testing :)`;
  const promotionKey: string = `WELCOME_MESSAGE`;

  try {
    const userBill: Bill = await billService.getByUser(user);
    const sender: User = await userService.getById(2);
    const senderCurrency: Currency = await currencyService.getByUser(sender);
    const senderBill: Bill = await billService.getByUser(sender);
    const name: Config = await configService.getByName("WELCOME_MESSAGE");
    const hasMessage: boolean = await messageService.hasMessage(user, name);
    const hasPromotion: boolean = await transactionService.hasPromotion(
      user,
      promotionKey
    );

    if (hasMessage && hasPromotion) return;

    let message = new Message();
    message.name = name;
    message.recipient = user;
    message.sender = sender;
    message = messageRepository.create(message);
    await messageRepository.insert(message);

    await billService.addAmountMoney(promotionalAmount, user, senderCurrency);

    let transaction = new Transaction();
    transaction.sender = senderBill;
    transaction.recipient = userBill;
    transaction.transferTitle = transferTitle;
    transaction.currency = senderCurrency;
    transaction.authorizationKey = promotionKey;
    transaction.authorizationStatus = true;
    transaction.amountMoney = promotionalAmount;
    transaction = transactionRepository.create(transaction);
    await transactionService.insert(transaction);

    await additionalService.setWidgetStatus(user);
    await additionalService.setWidgetStatus(sender);
    await additionalService.setNotification(user);

    await additionalService.setMessage(user);
  } catch (error) {
    return Promise.reject(error);
  }
}
