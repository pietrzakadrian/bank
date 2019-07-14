import { NextFunction, Request, Response, Router } from "express";
import * as HttpStatus from "http-status-codes";

// Import Intefaces
import { ResponseError } from "../resources/interfaces/ResponseError.interface";

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
    auth.authenticate(),

    async (req: Request, res: Response, next: NextFunction) => {
      const userService = new UserService();

      try {
        const user = await userService.getById(req.user.id);
        await userService.setLastSuccessfulLoggedDate(user);

        res.status(HttpStatus.OK).json({
          success: true
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

export default logoutRouter;
