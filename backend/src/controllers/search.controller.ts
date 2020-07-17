import { NextFunction, Request, Response, Router } from "express";
import * as HttpStatus from "http-status-codes";
import { param, validationResult } from "express-validator/check";

// Import Services
import { BillService } from "../services/bills.service";
import { UserService } from "../services/users.service";

// Import Entities
import { User } from "../entities/user.entity";
import { Bill } from "../entities/bill.entity";

// Import Interfaces
import { IResponseError } from "../resources/interfaces/IResponseError.interface";

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
      const userService = new UserService();
      const validationErrors = validationResult(req);
      const accountBill: string = req.params.accountBill;

      if (!validationErrors.isEmpty()) {
        const err: IResponseError = {
          success: false,
          code: HttpStatus.BAD_REQUEST,
          error: validationErrors.array()
        };
        return next(err);
      }

      try {
        const user: User = await userService.getById(req.user.id);
        const bills: Bill[] = await billService.getUsersByAccountBill(
          accountBill,
          user
        );

        if (bills) {
          res.status(HttpStatus.OK).json({
            bills
          });
        }
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

export default searchRouter;
