import bcrypt from "bcryptjs";
import { NextFunction, Request, Response, Router } from "express";
import * as HttpStatus from "http-status-codes";
import { validationResult, param } from "express-validator/check";

// Import Intefaces
import { IResponseError } from "../resources/interfaces/IResponseError.interface";

// Import Services
import { CurrencyService } from "../services/currency.service";

// Import Middlewares
import { AuthHandler } from "../middlewares/authHandler.middleware";
import { Currency } from "../entities/currency.entity";
import { getManager } from "typeorm";

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
      const currency: Currency[] = await currencyService.getAll();

      res.status(HttpStatus.OK).json({
        currency
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
 * Returns sets all currencies
 *
 * @Method POST
 * @URL /api/currency
 *
 */
currencyRouter
  .route("/")

  .patch(
    auth.authenticate("basic"),

    async (req: Request, res: Response, next: NextFunction) => {
      const currencyRepository = getManager().getRepository(Currency);
      const currencies: Currency[] = req.body;

      try {
        currencies.map(async (currency: Currency) => {
          const currencyEntity = new Currency();
          currencyEntity.name = currency.name;
          currencyEntity.exchangeRate = currency.exchangeRate;
          currencyEntity.exchangeRateSyncDate = currency.exchangeRateSyncDate;

          await currencyRepository.update(
            { name: currencyEntity.name },
            currencyEntity
          );
        });

        res.status(HttpStatus.OK).json({
          success: true
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

export default currencyRouter;
