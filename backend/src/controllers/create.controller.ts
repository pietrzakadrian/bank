import { NextFunction, Request, Response, Router } from "express";
import * as HttpStatus from "http-status-codes";
import { body, validationResult } from "express-validator/check";
import { getManager } from "typeorm";

// Impoty Services
import { TransactionService } from "../services/transactions.service";
import { BillService } from "../services/bills.service";
import { UserService } from "../services/users.service";
import { CurrencyService } from "../services/currency.service";

// Import Interfaces
import { IResponseError } from "../resources/interfaces/IResponseError.interface";

// Import Entities
import { User } from "../entities/user.entity";
import { Transaction } from "../entities/transaction.entity";
import { Bill } from "../entities/bill.entity";
import { Currency } from "../entities/currency.entity";

const createRouter: Router = Router();

/**
 * returns create a payment (requires confirmation)
 *
 * @Method POST
 * @URL /api/transactions/create
 *
 */
createRouter
  .route("/create")

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
        .isLength({ min: 1, max: 255 })
    ],

    async (req: Request, res: Response, next: NextFunction) => {
      const transactionService = new TransactionService();
      const billService = new BillService();
      const userService = new UserService();
      const currencyService = new CurrencyService();
      const userRepository = getManager().getRepository(User);
      const transactionRepository = getManager().getRepository(Transaction);
      const validationErrors = validationResult(req);

      try {
        const user: User = await userService.getById(req.user.id);
        const userBill: Bill = await billService.getByUser(user);
        const userAccountBill: string = userBill.accountBill;
        const accountBill: string = req.body.accountBill;
        const amountMoney: number = req.body.amountMoney;
        const currency: Currency = await currencyService.getByUser(user);
        const transferTitle: string = req.body.transferTitle;
        const recipientBill: Bill = await billService.getByAccountBill(
          accountBill
        );
        const recipientAccountBill: string = recipientBill.accountBill;
        const authorizationKey: string = transactionService.generateAuthorizationKey();
        const isAmountMoney: boolean = await billService.isAmountMoney(
          new Decimal(amountMoney),
          user
        );

        if (
          userAccountBill === recipientAccountBill ||
          !isAmountMoney ||
          !validationErrors.isEmpty()
        ) {
          const err: IResponseError = {
            success: false,
            code: HttpStatus.BAD_REQUEST,
            error: validationErrors.array()
          };
          return next(err);
        }

        let transaction = new Transaction();
        transaction.amountMoney = amountMoney;
        transaction.currency = currency;
        transaction.transferTitle = transferTitle;
        transaction.authorizationKey = authorizationKey;
        transaction.authorizationStatus = false;
        transaction.sender = userBill;
        transaction.recipient = recipientBill;

        transaction = transactionRepository.create(transaction);
        await transactionService.insert(transaction);
        // TODO: sendAuthorizationKey()

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

export default createRouter;
