import { NextFunction, Request, Response, Router } from "express";
import * as HttpStatus from "http-status-codes";
import { param, validationResult } from "express-validator/check";

// Import Services
import { AdditionalService } from "../services/additionals.service";
import { BillService } from "../services/bills.service";

// Import Interfaces
import { responseError } from "../resources/interfaces/responseError.interface";
import { getManager } from "typeorm";
import { User } from "../entities/user.entity";

const billsRouter: Router = Router();

/**
 * Returns basic data about the user
 *
 * @Method GET
 * @URL /api/bills
 *
 */
billsRouter
  .route("/")

  .get(async (req: Request, res: Response, next: NextFunction) => {
    const billService = new BillService();
    const additionalService = new AdditionalService();

    try {
      const userId = req.user.id;
      const bill = await billService.getByUserId(userId);
      const additional = await additionalService.getByUserId(userId);

      if (bill && additional) {
        res.status(HttpStatus.OK).json({
          accountBill: bill.accountBill,
          availableFunds: bill.availableFunds,
          currency: {
            id: bill.currency.id,
            name: bill.currency.name
          },
          additionals: {
            accountBalanceHistory: additional.accountBalanceHistory,
            incomingTransfersSum: additional.incomingTransfersSum,
            outgoingTransfersSum: additional.outgoingTransfersSum
          }
        });
      }
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
 * Checks whether the account bill already exists
 *
 * @Method GET
 * @URL /api/bills/:accountBill/isAccountBill
 *
 */
billsRouter
  .route("/:accountBill/isAccountBill")

  .get(
    [
      param("accountBill")
        .exists()
        .isNumeric()
        .isLength({ min: 26, max: 26 })
    ],

    async (req: Request, res: Response, next: NextFunction) => {
      const billService = new BillService();
      const validationErrors = validationResult(req);

      if (!validationErrors.isEmpty()) {
        const err: responseError = {
          success: false,
          code: HttpStatus.BAD_REQUEST,
          error: validationErrors.array()
        };
        return next(err);
      }

      try {
        const accountBill = req.params.accountBill;
        const userId = req.user.id;
        const userRepository = getManager().getRepository(User);
        const bills = await billService.getUsersByAccountBill(
          accountBill,
          userId
        );
        const recipient = await billService.getByAccountBill(accountBill);
        const recipientId = userRepository.getId(recipient.user);

        if (bills)
          return res.status(HttpStatus.OK).json({
            isAccountBill: true,
            recipientId
          });

        res.status(HttpStatus.OK).json({
          isAccountBill: false
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

/**
 * Checks whether the account bill already exists
 *
 * @Method GET
 * @URL /api/bills/:amountMoney/isAmountMoney
 *
 */
billsRouter
  .route("/:amountMoney/isAmountMoney")

  .get(
    [
      param("amountMoney")
        .exists()
        .isNumeric()
    ],

    async (req: Request, res: Response, next: NextFunction) => {
      const billService = new BillService();
      const validationErrors = validationResult(req);

      if (!validationErrors.isEmpty()) {
        const err: responseError = {
          success: false,
          code: HttpStatus.BAD_REQUEST,
          error: validationErrors.array()
        };
        return next(err);
      }

      try {
        const amountMoney = req.params.amountMoney;
        const userId = req.user.id;

        const isAmountMoney = await billService.isAmountMoney(
          amountMoney,
          userId
        );
        return res.status(HttpStatus.OK).json({
          isAmountMoney
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

export default billsRouter;
