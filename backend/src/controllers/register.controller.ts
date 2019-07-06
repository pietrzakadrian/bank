import { NextFunction, Request, Response, Router } from "express";
import { body, validationResult } from "express-validator/check";
import * as HttpStatus from "http-status-codes";

import config from "../config/config";
import { ApiResponseError } from "../resources/interfaces/apiResponseError.interface";
import { UserService } from "../services/users.service";
import { BillService } from "../services/bills.service";
import { User } from "../entities/user.entity";
import { getManager } from "typeorm";

const { errors } = config;
const registerRouter: Router = Router();

// on routes that end in /register
// -----------------------------
registerRouter
  .route("/")

  .post(
    [
      body("name").isLength({ min: 1 }),
      body("surname").isLength({ min: 1 }),
      body("email").isEmail(),
      body("login")
        .isNumeric()
        .isLength({ min: 1, max: 20 }),
      body("password").isLength({ min: 1 }),
      body("currencyId")
        .isNumeric()
        .isLength({ min: 1, max: 1 })
    ],
    async (req: Request, res: Response, next: NextFunction) => {
      const validationErrors = validationResult(req);

      if (validationErrors.isEmpty()) {
        const userService = new UserService();
        const billService = new BillService();
        // const additionalService = new AdditionalService();

        const accountBill = await billService.generateAccountBill();
        console.log("accountBill", accountBill);

        await userService.instantiate(req.body);
        await billService.instantiate(req.body);

        try {
          await userService.insert(req.body);

          res.status(HttpStatus.OK).json({
            success: true
          });
        } catch (err) {
          // DB exception or some other exception while inserting user
          const error: ApiResponseError = {
            code: HttpStatus.BAD_REQUEST,
            errorObj: err
          };
          next(error);
        }
      } else {
        // validaiton error
        const error: ApiResponseError = {
          code: HttpStatus.BAD_REQUEST,
          errorsArray: validationErrors.array()
        };
        next(error);
      }
    }
  );

export default registerRouter;
