import { NextFunction, Request, Response, Router } from "express";
import * as HttpStatus from "http-status-codes";
import { responseError } from "../resources/interfaces/responseError.interface";
import { UserService } from "../services/users.service";
import { param, validationResult } from "express-validator/check";

const usersRouter: Router = Router();

usersRouter
  .route("/isLogin")

  .get(
    [
      param("login")
        .isNumeric()
        .isLength({ min: 1, max: 20 })
    ],

    async (req: Request, res: Response, next: NextFunction) => {
      const userService = new UserService();
      const validationErrors = validationResult(req);

      if (validationErrors) {
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
  .route("/isEmail")

  .get(
    [
      param("email")
        .isEmail()
        .isLength({ min: 1, max: 255 })
    ],

    async (req: Request, res: Response, next: NextFunction) => {
      const userService = new UserService();
      const validationErrors = validationResult(req);

      if (validationErrors) {
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

export default usersRouter;
