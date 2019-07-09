import { NextFunction, Request, Response, Router } from "express";
import * as HttpStatus from "http-status-codes";
import { param, validationResult } from "express-validator/check";

// Import Services
import { BillService } from "../services/bills.service";

// Import Interfaces
import { responseError } from "../resources/interfaces/responseError.interface";

const searchRouter: Router = Router();

/**
 * Returns the result of the search for the account bill
 *
 * @Method GET
 * @URL /api/bills/:accountBill/search
 *
 */
searchRouter
  .route("/:accountBill/search")

  .get(
    [
      param("accountBill")
        .exists()
        .isNumeric()
        .isLength({ min: 1, max: 26 })
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
        const bill = await billService.getByAccountBill(accountBill);

        if (bill) {
          res.status(HttpStatus.OK).json({
            accountBill: bill.accountBill,
            user: {
              name: bill.user.name,
              surname: bill.user.surname
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

export default searchRouter;
