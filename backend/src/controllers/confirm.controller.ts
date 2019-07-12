import { NextFunction, Request, Response, Router } from "express";
import * as HttpStatus from "http-status-codes";
import { body, validationResult } from "express-validator/check";
import { getManager } from "typeorm";

// Impoty Services
import { TransactionService } from "../services/transactions.service";
import { BillService } from "../services/bills.service";

// Import Interfaces
import { responseError } from "../resources/interfaces/responseError.interface";

// Import Entities
import { User } from "../entities/user.entity";
import { Transaction } from "../entities/transaction.entity";

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
      const userRepository = getManager().getRepository(User);
      const transactionRepository = getManager().getRepository(Transaction);
      const validationErrors = validationResult(req);

      try {
        const userId = req.user.id;
        const userBill = await billService.getByUserId(userId);
        const user = userBill.user;
        const accountBill = req.body.accountBill;
        const amountMoney = req.body.amountMoney;
        const currency = userBill.currency;
        const transferTitle = req.body.transferTitle;
        const recipientBill = await billService.getByAccountBill(accountBill);
        const recipient = recipientBill.user;
        const recipientId = userRepository.getId(recipientBill.user);
        const authorizationKey = req.body.authorizationKey;
        const isAmountMoney = await billService.isAmountMoney(
          amountMoney,
          userId
        );

        const registeredTransaction = await transactionService.getOne(
          amountMoney,
          transferTitle,
          authorizationKey,
          user,
          recipient,
          currency
        );

        if (
          userId === recipientId ||
          registeredTransaction.authorizationKey !== authorizationKey ||
          !isAmountMoney ||
          !registeredTransaction ||
          !validationErrors.isEmpty()
        ) {
          const err: responseError = {
            success: false,
            code: HttpStatus.BAD_REQUEST,
            error: validationErrors.array()
          };
          return next(err);
        }

        //todo: sub/add Available Funds

        return res.status(HttpStatus.OK).json({
          success: true
        });
      } catch (error) {
        const err: responseError = {
          success: false,
          code: HttpStatus.BAD_REQUEST,
          error
        };
        next(err);
      }
    }
  );

export default confirmRouter;
