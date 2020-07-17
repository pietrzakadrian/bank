import { NextFunction, Request, Response, Router } from "express";
import * as HttpStatus from "http-status-codes";
import { body, validationResult } from "express-validator/check";
import { getManager } from "typeorm";
import { Decimal } from "decimal.js";

// Impoty Services
import { TransactionService } from "../services/transactions.service";
import { BillService } from "../services/bills.service";
import { UserService } from "../services/users.service";
import { CurrencyService } from "../services/currency.service";
import { AdditionalService } from "../services/additionals.service";

// Import Interfaces
import { IResponseError } from "../resources/interfaces/IResponseError.interface";

// Import Entities
import { User } from "../entities/user.entity";
import { Transaction } from "../entities/transaction.entity";
import { Currency } from "../entities/currency.entity";
import { Bill } from "../entities/bill.entity";

const confirmRouter: Router = Router();

/**
 * Returns the made payment
 *
 * @Method POST
 * @URL /api/transactions/confirm
 *
 */
confirmRouter
  .route("/confirm")

  .post(
    [
      body("accountBill")
        .exists()
        .isNumeric()
        .isLength({ min: 26, max: 26 }),
      body("amountMoney")
        .exists()
        .isNumeric()
        .isLength({ min: 1 }),
      body("transferTitle")
        .exists()
        .isString()
        .isLength({ min: 1, max: 255 }),
      body("authorizationKey")
        .exists()
        .isString()
        .isLength({ min: 5, max: 5 })
    ],

    async (req: Request, res: Response, next: NextFunction) => {
      const transactionService = new TransactionService();
      const billService = new BillService();
      const userService = new UserService();
      const currencyService = new CurrencyService();
      const additionalService = new AdditionalService();
      const transactionRepository = getManager().getRepository(Transaction);
      const validationErrors = validationResult(req);
      const accountBill: string = req.body.accountBill;
      const amountMoney: number = req.body.amountMoney;
      const transferTitle: string = req.body.transferTitle;

      try {
        const user: User = await userService.getById(req.user.id);
        const senderCurrency: Currency = await currencyService.getByUser(user);
        const recipientBill: Bill = await billService.getByAccountBill(
          accountBill
        );
        const recipient: User = recipientBill.user;
        const authorizationKey: string = req.body.authorizationKey;
        const isAmountMoney: boolean = await billService.isAmountMoney(
          new Decimal(amountMoney),
          user
        );
        const registeredTransaction = await transactionService.getTransaction(
          amountMoney,
          transferTitle,
          authorizationKey,
          user,
          recipient,
          senderCurrency
        );

        if (
          user === recipient ||
          registeredTransaction.authorizationKey !== authorizationKey ||
          !isAmountMoney ||
          !registeredTransaction ||
          !validationErrors.isEmpty()
        ) {
          const err: IResponseError = {
            success: false,
            code: HttpStatus.BAD_REQUEST,
            error: validationErrors.array()
          };
          return next(err);
        }

        await billService.subAmountMoney(amountMoney, user);
        await billService.addAmountMoney(
          amountMoney,
          recipient,
          senderCurrency
        );

        registeredTransaction.authorizationStatus = true;
        await transactionRepository.save(registeredTransaction);

        await additionalService.setWidgetStatus(user);
        await additionalService.setWidgetStatus(recipient);
        await additionalService.setNotification(recipient);

        return res.status(HttpStatus.OK).json({
          success: true
        });
      } catch (error) {
        const err: IResponseError = {
          success: false,
          code: HttpStatus.BAD_REQUEST,
          error
        };
        next(err);
      }
    }
  );

export default confirmRouter;
