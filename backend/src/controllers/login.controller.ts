import bcrypt from "bcryptjs";
import { NextFunction, Request, Response, Router } from "express";
import * as HttpStatus from "http-status-codes";
import { body, validationResult } from "express-validator/check";

// Import Intefaces
import { responseError } from "../resources/interfaces/responseError.interface";

// Import Services
import { UserService } from "../services/users.service";

// Import Middlewares
import { AuthHandler } from "../middlewares/authHandler.middleware";

const loginRouter: Router = Router();

loginRouter
  .route("/login")

  .post(
    [
      body("login")
        .isNumeric()
        .isLength({ min: 1, max: 20 }),
      body("password").isLength({ min: 1, max: 255 })
    ],

    async (req: Request, res: Response, next: NextFunction) => {
      const userService = new UserService();
      const authHandler = new AuthHandler();

      const validationErrors = validationResult(req);
      const user = await userService.getByLogin(req.body.login);
      const isPasswordCorrect = await bcrypt.compare(
        req.body.password,
        user.password
      );

      if (!user || !isPasswordCorrect || validationErrors) {
        !isPasswordCorrect &&
          (await userService.setLastFailedLoggedDate(req.body.login));

        const err: responseError = {
          success: false,
          code: !isPasswordCorrect
            ? HttpStatus.UNAUTHORIZED
            : HttpStatus.BAD_REQUEST,
          error: validationErrors.array()
        };
        return next(err);
      }

      await userService.setLastPresentLoggedDate(req.body.login);
      const token = authHandler.generateToken(user);
      res.status(HttpStatus.OK).json({
        success: true,
        token
      });
    }
  );

export default loginRouter;
