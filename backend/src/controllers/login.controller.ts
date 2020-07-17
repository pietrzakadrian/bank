import bcrypt from "bcryptjs";
import { NextFunction, Request, Response, Router } from "express";
import * as HttpStatus from "http-status-codes";
import { body, validationResult } from "express-validator/check";

// Import Intefaces
import { IResponseError } from "../resources/interfaces/IResponseError.interface";

// Import Services
import { UserService } from "../services/users.service";

// Import Middlewares
import { AuthHandler } from "../middlewares/authHandler.middleware";

// Import Entities
import { User } from "../entities/user.entity";

// Import Middlewares
import enablePromotion from "../middlewares/promotion.middleware";
import enableWelcomeMessage from "../middlewares/welcomeMessage.middleware";

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
      const user: User = await userService.getByLogin(req.body.login);
      const isPasswordCorrect: boolean = await bcrypt.compare(
        req.body.password,
        user.password
      );

      if (!user || !isPasswordCorrect || !validationErrors.isEmpty()) {
        if (!isPasswordCorrect) await userService.setLastFailedLoggedDate(user);

        const err: IResponseError = {
          success: false,
          code: !isPasswordCorrect
            ? HttpStatus.UNAUTHORIZED
            : HttpStatus.BAD_REQUEST
        };
        return next(err);
      }

      try {
        await enablePromotion(user);
        await enableWelcomeMessage(user);

        await userService.setLastPresentLoggedDate(user);
        const token: string = authHandler.generateToken(user);
        res.status(HttpStatus.OK).json({
          success: true,
          token
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

export default loginRouter;
