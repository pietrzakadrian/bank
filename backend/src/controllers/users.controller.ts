import { NextFunction, Request, Response, Router } from "express";
import * as HttpStatus from "http-status-codes";
import { responseError } from "../resources/interfaces/responseError.interface";
import { UserService } from "../services/users.service";
import { body, param, validationResult } from "express-validator/check";

// Import Middlewares
import { AuthHandler } from "../middlewares/authHandler.middleware";
import { User } from "../entities/user.entity";
import { getManager } from "typeorm";

const auth = new AuthHandler();
const usersRouter: Router = Router();

/**
 * Checks whether the login already exists
 *
 * @Method GET
 * @URL /api/users/isLogin/:login
 *
 * @return {boolean}
 */
usersRouter
  .route("/isLogin/:login")

  .get(
    [
      param("login")
        .exists()
        .isNumeric()
        .isLength({ min: 1, max: 20 })
    ],

    async (req: Request, res: Response, next: NextFunction) => {
      const userService = new UserService();
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
        const response = await userService.getByLogin(req.params.login);

        if (response)
          return res.status(HttpStatus.OK).json({
            isLogin: true
          });

        res.status(HttpStatus.OK).json({
          isLogin: false
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
 * Checks whether the email already exists
 *
 * @Method GET
 * @URL /api/users/isEmail/:email
 *
 * @return {boolean}
 */
usersRouter
  .route("/isEmail/:email")

  .get(
    [
      param("email")
        .exists()
        .isEmail()
        .isLength({ min: 1, max: 255 })
    ],

    async (req: Request, res: Response, next: NextFunction) => {
      const userService = new UserService();
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
        const response = await userService.getByEmail(req.params.email);

        if (response)
          return res.status(HttpStatus.OK).json({
            isEmail: true
          });

        res.status(HttpStatus.OK).json({
          isEmail: false
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
 * Returns basic data about the user
 *
 * @Method GET
 * @URL /api/users/:id
 *
 * @return {object}
 */
usersRouter
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
      const userService = new UserService();
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
        const user = await userService.getById(req.params.id);

        if (user) {
          res.status(HttpStatus.OK).json({
            name: user.name,
            surname: user.surname,
            email: user.email,
            lastSuccessfulLoggedDate: user.lastSuccessfulLoggedDate,
            lastPresentLoggedDate: user.lastPresentLoggedDate,
            lastFailedLoggedDate: user.lastFailedLoggedDate
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

export default usersRouter;
