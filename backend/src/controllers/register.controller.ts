import { NextFunction, Request, Response, Router } from "express";
import { body, validationResult } from "express-validator/check";
import * as HttpStatus from "http-status-codes";
import { getManager } from "typeorm";

// Import Intefaces
import { responseError } from "../resources/interfaces/responseError.interface";

// Import Services
import { UserService } from "../services/users.service";
import { BillService } from "../services/bills.service";
import { AdditionalService } from "../services/additionals.service";

// Import Entity
import { User } from "../entities/user.entity";
import { Bill } from "../entities/bill.entity";
import { Additional } from "../entities/additional.entity";

const registerRouter: Router = Router();

/**
 * Register User
 *
 * @Method POST
 * @URL /api/auth/register
 *
 */
registerRouter
  .route("/register")

  .post(
    [
      body("name").isLength({ min: 1, max: 255 }),
      body("surname").isLength({ min: 1, max: 255 }),
      body("email")
        .isEmail()
        .isLength({ min: 1, max: 255 }),
      body("login")
        .isNumeric()
        .isLength({ min: 1, max: 20 }),
      body("password").isLength({ min: 1, max: 255 }),
      body("currencyId")
        .isNumeric()
        .isLength({ min: 1, max: 1 })
    ],

    async (req: Request, res: Response, next: NextFunction) => {
      const userService = new UserService();
      const billService = new BillService();
      const additionalService = new AdditionalService();

      const validationErrors = validationResult(req);

      const isLogin = await userService.getByLogin(req.body.login);
      const isEmail = await userService.getByEmail(req.body.email);

      if (isLogin || isEmail || !validationErrors.isEmpty()) {
        const error: responseError = {
          success: false,
          code: HttpStatus.BAD_REQUEST,
          error: validationErrors.array()
        };
        return next(error);
      }

      try {
        let user = new User();
        user.name = req.body.name;
        user.surname = req.body.surname;
        user.email = req.body.email;
        user.login = req.body.login;
        user.password = req.body.password;

        const userRepository = getManager().getRepository(User);
        user = userRepository.create(user);
        user = await userService.insert(user);

        let bill = new Bill();
        bill.user = userRepository.getId(user);
        bill.accountBill = await billService.generateAccountBill();
        bill.currency = req.body.currencyId;

        const billRepository = getManager().getRepository(Bill);
        bill = billRepository.create(bill);
        await billService.insert(bill);

        let additional = new Additional();
        additional.user = userRepository.getId(user);

        const additionalRepository = getManager().getRepository(Additional);
        additional = additionalRepository.create(additional);
        await additionalService.insert(additional);

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

export default registerRouter;
