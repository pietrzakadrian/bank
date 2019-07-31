import { NextFunction, Request, Response, Router } from "express";
import * as HttpStatus from "http-status-codes";
import { param, validationResult } from "express-validator/check";

// Impoty Services
import { AdditionalService } from "../services/additionals.service";
import { UserService } from "../services/users.service";
import { LanguageService } from "../services/languages.service";
import { MessageService } from "../services/messages.service";

// Import Entities
import { User } from "../entities/user.entity";
import { Additional } from "../entities/additional.entity";
import { Language } from "../entities/language.entity";

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

/**
 * Returns user messages
 *
 * @Method GET
 * @URL /api/additionals/messages
 *
 */
messagesRouter
  .route("/messages/:code")

  .get(
    [
      param("code")
        .exists()
        .isLength({ min: 2, max: 2 })
    ],
    async (req: Request, res: Response, next: NextFunction) => {
      const additionalService = new AdditionalService();
      const languageService = new LanguageService();
      const userService = new UserService();
      const messageService = new MessageService();

      try {
        const language: Language = await languageService.getByCode(
          req.params.code
        );
        const user: User = await userService.getById(req.user.id);
        const messages = await additionalService.getMessages(user, language);

        res.status(HttpStatus.OK).json({
          success: true,
          messages
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

export default messagesRouter;
