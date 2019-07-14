import { Request, NextFunction } from "express";
import config from "../config/config";
import { UserService } from "../services/users.service";
import { BillService } from "../services/bills.service";
import { TransactionService } from "../services/transactions.service";
import { Decimal } from "decimal.js";
import { Transaction } from "../entities/transaction.entity";
import { getManager } from "typeorm";
import { AdditionalService } from "../services/additionals.service";

/**
 * Controller to handle / GET request, show API information
 *
 *
 * @param {Request} req
 */
export default async function promotion(req: Request) {
  try {
    const userService = new UserService();
    const billService = new BillService();
    const transactionService = new TransactionService();
    const transactionRepository = getManager().getRepository(Transaction);
    const userLogin = req.body.login;
    const user = await userService.getByLogin(userLogin);
    const userBill = await billService.getByUser(user);
    const hasPromotion = await transactionService.hasPromotion(user);
    const sender = await userService.getByLogin(config.admin.login);
    const senderBill = await billService.getByUser(sender);
    const currency = userBill.currency;
    const promotionalAmount = new Decimal(10).toNumber();
    const transferTitle = `Create an account`;
    const promotionKey = `PROMO10`;

    if (hasPromotion) return;

    await billService.addAmountMoney(promotionalAmount, user, currency);

    let transaction = new Transaction();
    transaction.sender = senderBill;
    transaction.recipient = userBill;
    transaction.transferTitle = transferTitle;
    transaction.currency = currency;
    transaction.authorizationKey = promotionKey;
    transaction.authorizationStatus = true;
    transaction.amountMoney = promotionalAmount;
    transaction = transactionRepository.create(transaction);
    await transactionService.insert(transaction);
  } catch (error) {
    return Promise.reject(error);
  }
}
