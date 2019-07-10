import { NextFunction, Request, Response, Router } from "express";
import * as HttpStatus from "http-status-codes";
import { param, validationResult } from "express-validator/check";

// Import Middlewares
import { AuthHandler } from "../middlewares/authHandler.middleware";

// Impoty Services
import { UserService } from "../services/users.service";

// Import Interfaces
import { responseError } from "../resources/interfaces/responseError.interface";

const auth = new AuthHandler();
const usersRouter: Router = Router();

/**
 * Checks whether the login already exists
 *
 * @Method GET
 * @URL /api/users/isLogin/:login
 *
 */
usersRouter
  .route("/:login/isLogin")

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
 * @URL /api/users/:email/isEmail
 *
 */
usersRouter
  .route("/:email/isEmail")

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
 * @URL /api/users/
 *
 */
usersRouter
  .route("/")

  .get(
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
        const userId = req.user.id;
        const user = await userService.getById(userId);

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
