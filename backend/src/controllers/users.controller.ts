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

usersRouter
  .route("/isLogin/:login")

  .get(
    [
      param("login")
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

usersRouter
  .route("/isEmail/:email")

  .get(
    [
      param("email")
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

usersRouter
  .route("/:id")

  .get(
    [
      param("id")
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
  )

  .put(
    [
      param("id")
        .isNumeric()
        .isLength({ min: 1 }),
      body("name")
        .optional()
        .isLength({ min: 1, max: 255 }),
      body("surname")
        .optional()
        .isLength({ min: 1, max: 255 }),
      body("email")
        .optional()
        .isEmail()
        .isLength({ min: 1, max: 255 }),
      body("password")
        .optional()
        .isLength({ min: 1, max: 255 })
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
        const updatedUser = await userService.getById(req.params.id);
        const user = new User();
        user.id = req.params.id;
        user.login = updatedUser.login;
        if (req.body.name) user.name = req.body.name;
        if (req.body.surname) user.surname = req.body.surname;
        if (req.body.email) user.email = req.body.email;
        if (req.body.password) await user.setPassword(req.body.password);

        await userService.update(user);
        res.status(HttpStatus.OK).json({
          success: true
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

export default usersRouter;
