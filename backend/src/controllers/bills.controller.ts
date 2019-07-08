import { NextFunction, Request, Response, Router } from "express";
import * as HttpStatus from "http-status-codes";
import { validationResult, param } from "express-validator/check";

// Import Intefaces
import { responseError } from "../resources/interfaces/responseError.interface";

// Import Services
import { BillService } from "../services/bills.service";
import { AdditionalService } from "../services/additionals.service";
import { CurrencyService } from "../services/currency.service";

// Import Middlewares
import { AuthHandler } from "../middlewares/authHandler.middleware";

const auth = new AuthHandler();
const billsRouter: Router = Router();

billsRouter
  .route("/:id")

  .get(
    [
      param("id")
        .isNumeric()
        .isLength({ min: 1 })
    ],
    auth.authenticate(),

    async (req: Request, res: Response, next: NextFunction) => {
      const billService = new BillService();
      const additionalService = new AdditionalService();
      //   const currencyService = new CurrencyService();

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
        const bill = await billService.getByUserId(req.params.id);
        const additional = await additionalService.getByUserId(req.params.id);
        // const currency = await currencyService.getById(bill.currency);

        if (bill && additional) {
          res.status(HttpStatus.OK).json({
            accountBill: bill.accountBill,
            availableFunds: bill.availableFunds,
            currencyId: bill.currency,
            accountBalanceHistory: additional.accountBalanceHistory,
            incomingTransfersSum: additional.incomingTransfersSum,
            outgoingTransfersSum: additional.outgoingTransfersSum
            // currencyName: currency.name
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
