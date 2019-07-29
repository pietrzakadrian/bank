import { NextFunction, Request, Response, Router } from "express";
import * as HttpStatus from "http-status-codes";
import { param, validationResult } from "express-validator/check";

// Impoty Services
import { TransactionService } from "../services/transactions.service";

// Import Entities
import { User } from "../entities/user.entity";
import { Transaction } from "../entities/transaction.entity";
import { UserService } from "../services/users.service";

// Import Interfaces
import { IResponseError } from "../resources/interfaces/IResponseError.interface";

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
    const userService = new UserService();
    const user: User = await userService.getById(req.user.id);

    try {
      const senderTransactions: Transaction[] = await transactionService.getSenderTransactions(
        user
      );

      if (senderTransactions)
        return res.status(HttpStatus.OK).json({
          senderTransactions
        });
    } catch (error) {
      const err: IResponseError = {
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
    const userService = new UserService();
    const user: User = await userService.getById(req.user.id);

    try {
      const recipientTransactions: Transaction[] = await transactionService.getRecipientTransactions(
        user
      );

      if (recipientTransactions)
        return res.status(HttpStatus.OK).json({
          recipientTransactions
        });
    } catch (error) {
      const err: IResponseError = {
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
  .route("/:offset?")

  .get(
    [
      param("offset")
        .optional()
        .isNumeric()
    ],

    async (req: Request, res: Response, next: NextFunction) => {
      const transactionService = new TransactionService();
      const userService = new UserService();
      const validationErrors = validationResult(req);
      const user: User = await userService.getById(req.user.id);
      const offset: number = req.params.offset || 0;
      const limit: number = 12;

      if (!validationErrors.isEmpty()) {
        const err: IResponseError = {
          success: false,
          code: HttpStatus.BAD_REQUEST,
          error: validationErrors.array()
        };
        return next(err);
      }

      try {
        const transactions = await transactionService.getTransactions(
          user,
          offset,
          limit
        );

        if (transactions)
          return res.status(HttpStatus.OK).json({
            transactions
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
      const userService = new UserService();
      const validationErrors = validationResult(req);
      const sender: User = await userService.getById(req.user.id);
      const recipient: User = await userService.getById(req.params.id);

      try {
        const authorizationKey: string = await transactionService.getAuthorizationKey(
          sender,
          recipient
        );

        if (!validationErrors.isEmpty() || !authorizationKey) {
          const err: IResponseError = {
            success: false,
            code: HttpStatus.BAD_REQUEST,
            error: validationErrors.array()
          };
          return next(err);
        }

        if (authorizationKey)
          return res.status(HttpStatus.OK).json({
            success: true,
            authorizationKey: authorizationKey
          });

        return res.status(HttpStatus.OK).json({
          success: false
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

/**
 * Returns authorization key for the last
 *
 * @Method GET
 * @URL /api/transactions/:id/transaction
 *
 */
transactionsRouter
  .route("/:id/transaction")

  .get(
    [
      param("id")
        .exists()
        .isNumeric()
    ],

    async (req: Request, res: Response, next: NextFunction) => {
      const transactionService = new TransactionService();
      const userService = new UserService();
      const validationErrors = validationResult(req);
      const sender: User = await userService.getById(req.user.id);
      const recipient: User = await userService.getById(req.params.id);

      try {
        const lastAssociatedTransaction: Array<object> = await transactionService.getLastAssociatedTransaction(
          sender,
          recipient
        );

        if (!validationErrors.isEmpty()) {
          const err: IResponseError = {
            success: false,
            code: HttpStatus.BAD_REQUEST,
            error: validationErrors.array()
          };
          return next(err);
        }

        if (lastAssociatedTransaction)
          return res.status(HttpStatus.OK).json({
            lastAssociatedTransaction
          });

        return res.status(HttpStatus.OK).json({
          success: false
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

export default transactionsRouter;
