import * as HttpStatus from "http-status-codes";
import { Request, Response, NextFunction } from "express";

import { Logger } from "../utils/logger";

/**
 * Generic error response middleware for internal server errors.
 *
 * @param  {any} err
 * @param  {Request} req
 * @param  {Response} res
 * @param  {NextFunction} next
 * @returns void
 */
export default function genericErrorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const logger = new Logger(__filename);
  logger.error(`Error: ${JSON.stringify(err)}`);

  const errCode = err.status || err.code || 500;
  let errorMsg = "";

  if (Array.isArray(err.error)) {
    errorMsg = err.error.map((e: any) => e.param + ": " + e.msg).toString();
  } else {
    errorMsg = err.error
      ? err.error.message + " " + (err.error.detail || "")
      : err.message;
  }

  res.status(errCode).json({
    success: false,
    code: errCode,
    message: errorMsg
  });
}
