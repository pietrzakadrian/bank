import { NextFunction, Request, Response, Router } from "express";
import * as HttpStatus from "http-status-codes";
import { getManager } from "typeorm";

import { User } from "../entities/user.entity";
import { AuthHandler } from "../middlewares/authHandler.middleware";
import { responseError } from "../resources/interfaces/responseError.interface";
import { UserService } from "../services/users.service";

const auth = new AuthHandler();
const utilsRouter: Router = Router();

// todo: shouldn't go in production or it needs to be protected with some password/key in body etc
utilsRouter.post("/first_account", async (req: Request, res: Response) => {
  let user = new User();
  user.name = "Test";
  user.surname = "Account";
  user.email = "test@v2x.network";
  user.password = "123456";

  const userRepository = getManager().getRepository(User);
  user = userRepository.create(user);

  await userRepository.save(user);

  res.status(HttpStatus.OK).json({
    success: true,
    user: user
  });
});

utilsRouter.get(
  "/me",
  auth.authenticate(),
  async (req: Request, res: Response, next: NextFunction) => {
    const userService = new UserService();
    try {
      const user = await userService.getByEmail(req.user.email);
      if (user) {
        return res.status(HttpStatus.OK).json({
          success: true,
          user: user
        });
      }
      return res.status(HttpStatus.UNAUTHORIZED).json({
        success: false,
        message: "Authentication error. Unable to find user!"
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

export default utilsRouter;
