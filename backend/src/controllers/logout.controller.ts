import bcrypt from "bcryptjs";
import { NextFunction, Request, Response, Router } from "express";
import * as HttpStatus from "http-status-codes";
import { validationResult, param } from "express-validator/check";

// Import Intefaces
import { responseError } from "../resources/interfaces/responseError.interface";

// Import Services
import { UserService } from "../services/users.service";

// Import Middlewares
import { AuthHandler } from "../middlewares/authHandler.middleware";

const auth = new AuthHandler();
const logoutRouter: Router = Router();

/**
 * Logout User
 *
 * @Method PUT
 * @URL /api/auth/logout
 *
 */
logoutRouter
  .route("/logout")

  .put(
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
        const userId = req.user.id;
        await userService.setLastSuccessfulLoggedDate(userId);

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

export default logoutRouter;
