import { NextFunction, Request, Response, Router } from "express";
import * as HttpStatus from "http-status-codes";
import { getManager } from "typeorm";
import { responseError } from "../resources/interfaces/responseError.interface";
import { BillService } from "../services/bills.service";
import { body, param, validationResult } from "express-validator/check";

// Import Middlewares
import { AuthHandler } from "../middlewares/authHandler.middleware";
import { User } from "../entities/user.entity";
import { AdditionalService } from "../services/additionals.service";
import { CurrencyService } from "../services/currency.service";
import { Bill } from "../entities/bill.entity";

const auth = new AuthHandler();
const billsRouter: Router = Router();

/**
 * Returns basic data about the user
 *
 * @Method GET
 * @URL /api/bills/:id
 *
 * @return {object}
 */
billsRouter
  .route("/:id")

  .get(
    [
      param("id")
        .exists()
        .isNumeric()
        .isLength({ min: 1 })
    ],
    auth.authenticate(),

    async (req: Request, res: Response, next: NextFunction) => {
      const billService = new BillService();
      const additionalService = new AdditionalService();
      const currencyService = new CurrencyService();

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
        let bill = await billService.getByUserId(req.params.id);
        const additional = await additionalService.getByUserId(req.params.id);

        console.log("bill.currency", bill);

        if (bill && additional) {
          res.status(HttpStatus.OK).json({
            accountBill: bill.accountBill,
            availableFunds: bill.availableFunds,
            currency: {
              //   id: bill.currency.id,
              //   name: currency.name
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
    }
  );

export default billsRouter;
