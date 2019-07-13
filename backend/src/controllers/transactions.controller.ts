import { NextFunction, Request, Response, Router } from "express";
import * as HttpStatus from "http-status-codes";
import { param, validationResult } from "express-validator/check";

// Impoty Services
import { TransactionService } from "../services/transactions.service";

// Import Interfaces
import { ResponseError } from "../resources/interfaces/responseError.interface";

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
      const err: ResponseError = {
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
      const err: ResponseError = {
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
 * @URL /api/transactions/:offset
 *
 */
transactionsRouter
  .route("/:offset")

  .get(
    [
      param("offset")
        .exists()
        .isNumeric()
    ],

    async (req: Request, res: Response, next: NextFunction) => {
      const transactionService = new TransactionService();
      const validationErrors = validationResult(req);
      const userId = req.user.id;
      const offset = req.params.offset;

      if (!validationErrors.isEmpty()) {
        const err: ResponseError = {
          success: false,
          code: HttpStatus.BAD_REQUEST,
          error: validationErrors.array()
        };
        return next(err);
      }

      try {
        const transactions = await transactionService.getTransactions(
          userId,
          offset
        );

        if (transactions)
          return res.status(HttpStatus.OK).json({
            transactions
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

/**
 * Returns authorization key for the last
 *
 * @Method GET
 * @URL /api/transactions/:id/key
 *
 */
transactionsRouter
  .route("/:id/key")

  .get(
    [
      param("id")
        .exists()
        .isNumeric()
    ],

    async (req: Request, res: Response, next: NextFunction) => {
      const transactionService = new TransactionService();
      const validationErrors = validationResult(req);
      const userId = req.user.id;
      const recipientId = req.params.id;

      if (!validationErrors.isEmpty()) {
        const err: ResponseError = {
          success: false,
          code: HttpStatus.BAD_REQUEST,
          error: validationErrors.array()
        };
        return next(err);
      }

      try {
        const authorizationKey = await transactionService.getAuthorizationKey(
          userId,
          recipientId
        );

        if (authorizationKey)
          return res.status(HttpStatus.OK).json({
            success: true,
            authorizationKey
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

export default transactionsRouter;
