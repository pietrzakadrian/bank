import bcrypt from 'bcryptjs';
import { NextFunction, Request, Response, Router } from 'express';
import * as HttpStatus from 'http-status-codes';
import { body, validationResult } from 'express-validator/check';
import config from '../config/config';
import { AuthHandler } from '../middlewares/authHandler';
import { ApiResponseError } from '../resources/interfaces/ApiResponseError';
import { UserService } from '../services/users.service';

const loginRouter: Router = Router();
const { errors } = config;

// on routes that end in /login
// -----------------------------
loginRouter.route('/')
  .post(
    [
      body('email').isEmail(),
      body('password').isLength({ min: 1 }),
    ],
    async (req: Request, res: Response, next: NextFunction) => {

      const validationErrors = validationResult(req);
      if (validationErrors.isEmpty()) { // no error
        const userService = new UserService();
        let user = await userService.getByEmail(req.body.email);
        if (!user) {
          res.status(HttpStatus.BAD_REQUEST).json({
            success: false,
            message: `${errors.emailNotFound}`
          });
          return;
        }

        // now compare password
        const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password);
        // generate token and return
        if (isPasswordCorrect) {
          const authHandler = new AuthHandler();
          const token = authHandler.generateToken(user);
          res.status(HttpStatus.OK).json({
            success: true,
            token: token
          });
          return;
        } else {
          // incorrect password
          const error: ApiResponseError = {
            code: HttpStatus.UNAUTHORIZED,
            errorObj: {
              message: errors.incorrectPassword
            }
          };
          next(error);
          return;
        }
      } else {  // validation error
        const error: ApiResponseError = {
          code: HttpStatus.BAD_REQUEST,
          errorsArray: validationErrors.array()
        };
        next(error);
      }

    });

export default loginRouter;
