import { NextFunction, Request, Response, Router } from "express";
import { body, validationResult } from "express-validator/check";
import * as HttpStatus from "http-status-codes";

import config from "../config/config";
import { ApiResponseError } from "../resources/interfaces/apiResponseError.interface";
import { UserService } from "../services/users.service";

const { errors } = config;
const signupRouter: Router = Router();

// on routes that end in /signup
// -----------------------------
signupRouter
  .route("/")

  .post(
    [
      body("firstName").isLength({ min: 1 }),
      body("lastName").isLength({ min: 1 }),
      body("email").isEmail(),
      body("password").isLength({ min: 6 })
    ],
    async (req: Request, res: Response, next: NextFunction) => {
      const validationErrors = validationResult(req);

      if (validationErrors.isEmpty()) {
        const userService = new UserService();
        await userService.instantiate(req.body);
        try {
          const response = await userService.insert(req.body);
          res.status(HttpStatus.OK).json({
            success: true,
            data: response
          });
        } catch (err) {
          // DB exception or some other exception while inserting user
          const error: ApiResponseError = {
            code: HttpStatus.BAD_REQUEST,
            errorObj: err
          };
          next(error);
        }
      } else {
        // validaiton error
        const error: ApiResponseError = {
          code: HttpStatus.BAD_REQUEST,
          errorsArray: validationErrors.array()
        };
        next(error);
      }
    }
  );

export default signupRouter;
