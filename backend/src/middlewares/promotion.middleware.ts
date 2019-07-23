import config from "../config/config";
import { Decimal } from "decimal.js";
import { getManager } from "typeorm";

// Import Services
import { UserService } from "../services/users.service";
import { BillService } from "../services/bills.service";
import { TransactionService } from "../services/transactions.service";
import { CurrencyService } from "../services/currency.service";
import { AdditionalService } from "../services/additionals.service";

// Import Entities
import { Transaction } from "../entities/transaction.entity";
import { User } from "../entities/user.entity";
import { Bill } from "../entities/bill.entity";
import { Currency } from "../entities/currency.entity";

/**
 * performs dependencies of the promotion
 */
export default async function promotion(user: User) {
  try {
    const userService = new UserService();
    const billService = new BillService();
    const currencyService = new CurrencyService();
    const transactionService = new TransactionService();
    const additionalService = new AdditionalService();
    const transactionRepository = getManager().getRepository(Transaction);
    const hasPromotion: boolean = await transactionService.hasPromotion(user);
    const userBill: Bill = await billService.getByUser(user);
    const sender: User = await userService.getByLogin(config.admin.login);
    const senderBill: Bill = await billService.getByUser(sender);
    const senderCurrency: Currency = await currencyService.getByUser(sender);
    const promotionalAmount: number = new Decimal(10).toNumber();
    const transferTitle: string = `Create an account`;
    const promotionKey: string = `PROMO10`;

    if (hasPromotion) return;

    await billService.subAmountMoney(promotionalAmount, sender);
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
  } catch (error) {
    return Promise.reject(error);
  }
}
