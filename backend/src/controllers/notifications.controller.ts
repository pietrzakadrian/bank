import { NextFunction, Request, Response, Router } from "express";
import * as HttpStatus from "http-status-codes";
import { param, validationResult } from "express-validator/check";

// Import Middlewares
import { AuthHandler } from "../middlewares/authHandler.middleware";

// Impoty Services
import { AdditionalService } from "../services/additionals.service";

// Import Interfaces
import { responseError } from "../resources/interfaces/responseError.interface";

const auth = new AuthHandler();
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

      console.log("additional", additional);

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
      const err: responseError = {
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
      const err: responseError = {
        success: false,
        code: HttpStatus.BAD_REQUEST,
        error
      };
      next(err);
    }
  });

export default notificationsRouter;
