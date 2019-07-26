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

const notificationsRouter: Router = Router();

/**
 * Checks whether the login already exists
 *
 * @Method GET
 * @URL /api/additionals/notifications/isNotification
 *
 */
notificationsRouter
  .route("/notifications/isNotification")

  .get(async (req: Request, res: Response, next: NextFunction) => {
    const additionalService = new AdditionalService();
    const userService = new UserService();

    try {
      const user: User = await userService.getById(req.user.id);
      const additional: Additional = await additionalService.getByUser(user);
      const isNotification: boolean = additional.notificationStatus;
      const notificationCount: number = additional.notificationCount;

      if (isNotification)
        return res.status(HttpStatus.OK).json({
          isNotification,
          notificationCount
        });

      res.status(HttpStatus.OK).json({
        isNotification
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
 * @URL /api/additionals/notifications
 *
 */
notificationsRouter
  .route("/notifications")

  .put(async (req: Request, res: Response, next: NextFunction) => {
    const additionalService = new AdditionalService();
    const userService = new UserService();

    try {
      const user: User = await userService.getById(req.user.id);
      await additionalService.unsetNotifications(user);

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
 * Get user's new notifications
 *
 * @Method GET
 * @URL /api/additionals/notifications/:limit
 *
 */
notificationsRouter
  .route("/notifications/:limit")

  .get(
    [
      param("limit")
        .exists()
        .isNumeric()
    ],

    async (req: Request, res: Response, next: NextFunction) => {
      const additionalService = new AdditionalService();
      const userService = new UserService();
      const validationErrors = validationResult(req);
      const limit: number = req.params.limit;

      if (!validationErrors.isEmpty()) {
        const err: IResponseError = {
          success: false,
          code: HttpStatus.BAD_REQUEST,
          error: validationErrors.array()
        };
        return next(err);
      }

      try {
        const user: User = await userService.getById(req.user.id);
        const notifications: Transaction[] = await additionalService.getNotifications(
          user,
          limit
        );

        if (notifications) {
          res.status(HttpStatus.OK).json({
            success: true,
            notifications
          });
        }
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

export default notificationsRouter;
