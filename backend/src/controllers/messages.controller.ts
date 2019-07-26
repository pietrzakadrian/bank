import { NextFunction, Request, Response, Router } from "express";
import * as HttpStatus from "http-status-codes";
import { param, validationResult } from "express-validator/check";

// Impoty Services
import { AdditionalService } from "../services/additionals.service";
import { UserService } from "../services/users.service";

// Import Entities
import { User } from "../entities/user.entity";
import { Additional } from "../entities/additional.entity";
import { Transaction } from "../entities/transaction.entity";

// Import Interfaces
import { IResponseError } from "../resources/interfaces/IResponseError.interface";

const messagesRouter: Router = Router();

/**
 * Checks whether the login already exists
 *
 * @Method GET
 * @URL /api/additionals/messages/isMessage
 *
 */
messagesRouter
  .route("/messages/isMessage")

  .get(async (req: Request, res: Response, next: NextFunction) => {
    const additionalService = new AdditionalService();
    const userService = new UserService();

    try {
      const user: User = await userService.getById(req.user.id);
      const additional: Additional = await additionalService.getByUser(user);
      const isMessage: boolean = additional.messageStatus;
      const messageCount: number = additional.messageCount;

      console.log(messageCount);

      if (isMessage)
        return res.status(HttpStatus.OK).json({
          isMessage,
          messageCount
        });

      res.status(HttpStatus.OK).json({
        isMessage,
        messageCount
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

/**
 * Unsets all notifications
 *
 * @Method PUT
 * @URL /api/additionals/messages
 *
 */
messagesRouter
  .route("/messages")

  .put(async (req: Request, res: Response, next: NextFunction) => {
    const additionalService = new AdditionalService();
    const userService = new UserService();

    try {
      const user: User = await userService.getById(req.user.id);
      await additionalService.unsetMessages(user);

      res.status(HttpStatus.OK).json({
        success: true
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

export default messagesRouter;
