import bcrypt from "bcryptjs";
import { NextFunction, Request, Response, Router } from "express";
import * as HttpStatus from "http-status-codes";
import { validationResult, param } from "express-validator/check";

// Import Intefaces
import { ResponseError } from "../resources/interfaces/ResponseError.interface";

// Import Services
import { CurrencyService } from "../services/currency.service";

// Import Middlewares
import { AuthHandler } from "../middlewares/authHandler.middleware";

const auth = new AuthHandler();
const currencyRouter: Router = Router();

/**
 * Returns all currency
 *
 * @Method GET
 * @URL /api/currency
 *
 */
currencyRouter
  .route("/")

  .get(async (req: Request, res: Response, next: NextFunction) => {
    const currencyService = new CurrencyService();

    try {
      const currency = await currencyService.getAll();

      res.status(HttpStatus.OK).json({
        currency
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

export default currencyRouter;
