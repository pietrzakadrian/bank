import bcrypt from "bcryptjs";
import { NextFunction, Request, Response, Router } from "express";
import * as HttpStatus from "http-status-codes";
import { body, validationResult } from "express-validator/check";

// Import Intefaces
import { ResponseError } from "../resources/interfaces/ResponseError.interface";

// Import Services
import { UserService } from "../services/users.service";

// Import Middlewares
import { AuthHandler } from "../middlewares/authHandler.middleware";

const loginRouter: Router = Router();

/**
 * Login User
 *
 * @Method POST
 * @URL /api/auth/login
 *
 */
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

      if (!user || !isPasswordCorrect || !validationErrors.isEmpty()) {
        if (!isPasswordCorrect)
          await userService.setLastFailedLoggedDate(req.body.login);

        const err: ResponseError = {
          success: false,
          code: !isPasswordCorrect
            ? HttpStatus.UNAUTHORIZED
            : HttpStatus.BAD_REQUEST
        };
        return next(err);
      }

      try {
        await userService.setLastPresentLoggedDate(req.body.login);
        const token = authHandler.generateToken(user);
        res.status(HttpStatus.OK).json({
          success: true,
          token
        });
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

export default loginRouter;
