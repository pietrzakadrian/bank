import config from "../config/config";
import { Logger } from "../utils/logger";

/**
 * Node startup error handler.
 *
 * @param  {NodeJS.ErrnoException} err
 * @returns <void>
 */
export default function nodeErrorHandler(err: NodeJS.ErrnoException): void {
  switch (err.code) {
    case "EACCES":
      process.exit(1);

      break;

    case "EADDRINUSE":
      process.exit(1);

      break;

    default:
      throw err;
  }
}
