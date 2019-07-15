import { NextFunction, Request, Response, Router } from "express";
import * as HttpStatus from "http-status-codes";
import bcrypt from "bcryptjs";
import config from "../config/config";
import { IResponseError } from "../resources/interfaces/IResponseError.interface";
import { UserService } from "../services/users.service";
import { body, validationResult } from "express-validator/check";

const { errors } = config;
const usersRouter: Router = Router();

// on routes that end in /users
// -----------------------------
usersRouter
  .route("/")

  .get(async (req: Request, res: Response, next: NextFunction) => {
    const userService = new UserService();

    try {
      const response = await userService.getAll();
      // return 200 even if no user found. Empty array. Not an error
      res.status(HttpStatus.OK).json({
        success: true,
        data: response
      });
    } catch (error) {
      const err: IResponseError = {
        success: false,
        code: HttpStatus.BAD_REQUEST,
        error
      };
      next(err);
    }
  });

// on routes that end in /users/profile
// --------------------------------------
usersRouter
  .route("/profile")

  .get(async (req: Request, res: Response, next: NextFunction) => {
    const userService = new UserService();
    try {
      const user = await userService.getById(req.user.id);

      // if user not found
      if (!user) {
        res.status(HttpStatus.NOT_FOUND).json({
          success: false,
          message: `${errors.entityNotFound}: user id`
        });
        return;
      }
      // return found user
      res.status(HttpStatus.OK).json({
        success: true,
        user: user
      });
    } catch (error) {
      const err: IResponseError = {
        success: false,
        code: HttpStatus.BAD_REQUEST,
        error
      };
      next(err);
    }
  })

  .put(
    [
      body("firstName")
        .optional()
        .isLength({ min: 1 }),
      body("lastName")
        .optional()
        .isLength({ min: 1 }),
      body("email")
        .optional()
        .isEmail(),
      body("oldPassword")
        .optional()
        .isLength({ min: 6 }),
      body("newPassword")
        .optional()
        .isLength({ min: 6 })
    ],
    async (req: Request, res: Response, next: NextFunction) => {
      const validationErrors = validationResult(req);
      if (validationErrors.isEmpty()) {
        const userService = new UserService();
        try {
          const user = await userService.getById(req.user.id);
          // if user not found
          if (!user) {
            return res.status(HttpStatus.NOT_FOUND).json({
              success: false,
              message: `${errors.entityNotFound}: user id`
            });
          }

          // if user sent old & new password in body
          if (req.body.oldPassword && req.body.newPassword) {
            // Validate old password and return error if it's not correct
            const isOldPasswordCorrect = await bcrypt.compare(
              req.body.oldPassword,
              user.password
            );
            if (!isOldPasswordCorrect) {
              const err: IResponseError = {
                success: false,
                code: HttpStatus.BAD_REQUEST,
                error: {
                  message: errors.incorrectOldPassword
                }
              };
              return next(err);
            }
          } else if (
            (req.body.oldPassword && !req.body.newPassword) ||
            (!req.body.oldPassword && req.body.newPassword)
          ) {
            // if user sends only one of old or new password in body
            return res.status(HttpStatus.BAD_REQUEST).json({
              success: false,
              message: `${errors.oldAndNewPasswordBothInBody}`
            });
          }

          // now update the user attributes according to req body
          if (req.body.name) user.name = req.body.name;
          if (req.body.surname) user.surname = req.body.surname;
          if (req.body.email) user.email = req.body.email;
          if (req.body.newPassword)
            await user.setPassword(req.body.newPassword);

          const updatedUser = await userService.update(user);
          res.status(HttpStatus.OK).json({
            success: true,
            user: updatedUser
          });
        } catch (err) {
          // db errors e.g. unique constraints etc
          const error: IResponseError = {
            success: false,
            code: HttpStatus.BAD_REQUEST,
            error: err
          };
          next(error);
        }
      } else {
        // validation errors
        const error: IResponseError = {
          success: false,
          code: HttpStatus.BAD_REQUEST,
          error: validationErrors.array()
        };
        next(error);
      }
    }
  );

// on routes that end in /users/:id
// --------------------------------------
// Note: This route is dynamic and goes at end because we don't want /profile to match this route (e.g. 'profile' considered as valid id). Order matters in expressjs.
usersRouter
  .route("/:id")

  .get(async (req: Request, res: Response, next: NextFunction) => {
    const userService = new UserService();
    try {
      const user = await userService.getById(req.params.id);

      // if user not found
      if (!user) {
        res.status(HttpStatus.NOT_FOUND).json({
          success: false,
          message: `${errors.entityNotFound}: user id`
        });
        return;
      }
      // return found user
      res.status(HttpStatus.OK).json({
        success: true,
        user: user
      });
    } catch (error) {
      // db exception. example: wrong syntax of id e.g. special character
      const err: IResponseError = {
        success: false,
        code: HttpStatus.BAD_REQUEST,
        error
      };
      next(err);
    }
  });

export default usersRouter;
