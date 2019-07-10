import { NextFunction, Request, Response, Router } from "express";
import * as HttpStatus from "http-status-codes";
import { param, validationResult } from "express-validator/check";

// Import Middlewares
import { AuthHandler } from "../middlewares/authHandler.middleware";

// Impoty Services
import { TransactionService } from "../services/transactions.service";

// Import Interfaces
import { responseError } from "../resources/interfaces/responseError.interface";

const auth = new AuthHandler();
const transactionsRouter: Router = Router();

/**
 * Returns transfers sent by user
 *
 * @Method GET
 * @URL /api/transactions/sender
 *
 */
transactionsRouter
  .route("/sender")

  .get(async (req: Request, res: Response, next: NextFunction) => {
    const transactionService = new TransactionService();
    const userId = req.user.id;

    try {
      const senderTransactions = await transactionService.getSenderTransactions(
        userId
      );

      if (senderTransactions)
        return res.status(HttpStatus.OK).json({
          senderTransactions
        });
    } catch (error) {
      const err: responseError = {
        success: false,
        code: HttpStatus.BAD_REQUEST,
        error
      };
      next(err);
    }
  });

/**
 * Returns transfers gets by user
 *
 * @Method GET
 * @URL /api/transactions/recipient
 *
 */
transactionsRouter
  .route("/recipient")

  .get(async (req: Request, res: Response, next: NextFunction) => {
    const transactionService = new TransactionService();
    const userId = req.user.id;

    try {
      const recipientTransactions = await transactionService.getRecipientTransactions(
        userId
      );

      if (recipientTransactions)
        return res.status(HttpStatus.OK).json({
          recipientTransactions
        });
    } catch (error) {
      const err: responseError = {
        success: false,
        code: HttpStatus.BAD_REQUEST,
        error
      };
      next(err);
    }
  });

export default transactionsRouter;
