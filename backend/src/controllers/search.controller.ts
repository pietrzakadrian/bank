import { NextFunction, Request, Response, Router } from "express";
import * as HttpStatus from "http-status-codes";
import { param, validationResult } from "express-validator/check";

// Import Services
import { BillService } from "../services/bills.service";

// Import Interfaces
import { ResponseError } from "../resources/interfaces/ResponseError.interface";

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
        const err: ResponseError = {
          success: false,
          code: HttpStatus.BAD_REQUEST,
          error: validationErrors.array()
        };
        return next(err);
      }

      try {
        const accountBill = req.params.accountBill;
        const userId = req.user.id;
        const bills = await billService.getUsersByAccountBill(
          accountBill,
          userId
        );

        if (bills) {
          res.status(HttpStatus.OK).json({
            bills
          });
        }
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

export default searchRouter;
