import { NextFunction, Request, Response, Router } from "express";
import * as HttpStatus from "http-status-codes";
import { body, validationResult } from "express-validator/check";
import { getManager } from "typeorm";

// Impoty Services
import { TransactionService } from "../services/transactions.service";
import { BillService } from "../services/bills.service";

// Import Interfaces
import { ResponseError } from "../resources/interfaces/ResponseError.interface";

// Import Entities
import { User } from "../entities/user.entity";
import { Transaction } from "../entities/transaction.entity";

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
      const userRepository = getManager().getRepository(User);
      const transactionRepository = getManager().getRepository(Transaction);
      const validationErrors = validationResult(req);

      try {
        const userId = req.user.id;
        const user = await billService.getByUserId(userId);
        const accountBill = req.body.accountBill;
        const amountMoney = req.body.amountMoney;
        const currency = user.currency;
        const transferTitle = req.body.transferTitle;
        const recipient = await billService.getByAccountBill(accountBill);
        const recipientId = userRepository.getId(recipient.user);
        const authorizationKey = transactionService.generateAuthorizationKey();
        const isAmountMoney = await billService.isAmountMoney(
          amountMoney,
          userId
        );

        if (
          userId === recipientId ||
          !isAmountMoney ||
          !validationErrors.isEmpty()
        ) {
          const err: ResponseError = {
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
        transaction.sender = user;
        transaction.recipient = recipient;

        transaction = transactionRepository.create(transaction);
        await transactionService.insert(transaction);
        // TODO: sendAuthorizationKey()

        return res.status(HttpStatus.OK).json({
          success: true
        });
      } catch (error) {
        const err: ResponseError = {
          success: false,
          code: HttpStatus.BAD_REQUEST,
          error
        };
        next(err);
      }
    }
  );

export default createRouter;
