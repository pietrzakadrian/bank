import { NextFunction, Request, Response, Router } from "express";
import * as HttpStatus from "http-status-codes";
import { param, validationResult } from "express-validator/check";

// Import Middlewares
import { AuthHandler } from "../middlewares/authHandler.middleware";

// Impoty Services
import { AdditionalService } from "../services/additionals.service";

// Import Interfaces
import { ResponseError } from "../resources/interfaces/ResponseError.interface";

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

    try {
      const userId = req.user.id;
      const additional = await additionalService.getByUserId(userId);
      const isNotification = additional.notificationStatus;
      const notificationCount = additional.notificationCount;

      if (isNotification)
        return res.status(HttpStatus.OK).json({
          isNotification,
          notificationCount
        });

      res.status(HttpStatus.OK).json({
        isNotification: false
      });
    } catch (error) {
      const err: ResponseError = {
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

    try {
      const userId = req.user.id;
      const additional = await additionalService.unsetNotifications(userId);

      if (additional) {
        res.status(HttpStatus.OK).json({
          success: true
        });
      }
    } catch (error) {
      const err: ResponseError = {
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
 * @URL /api/additionals/notifications?:limit
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
      const validationErrors = validationResult(req);

      if (!validationErrors.isEmpty()) {
        const err: ResponseError = {
          success: false,
          code: HttpStatus.BAD_REQUEST,
          error: validationErrors.array()
        };
        return next(err);
      }

      try {
        const userId = req.user.id;
        const limit = req.params.limit;
        const notifications = await additionalService.getNotifications(
          userId,
          limit
        );

        if (notifications) {
          const transformNotifcations = notifications.map(
            ({ ...notification }) => ({
              amountMoney: notification.amountMoney,
              currency: notification.currency.name,
              createdDate: notification.createdDate,
              sender: {
                name: notification.sender.user.name,
                surname: notification.sender.user.surname
              }
            })
          );

          res.status(HttpStatus.OK).json({
            success: true,
            transformNotifcations
          });
        }
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

export default notificationsRouter;
