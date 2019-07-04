import "reflect-metadata";

import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import { createConnection } from "typeorm";

import config from "./config/config";
import { AuthHandler } from "./middlewares/authHandler.middleware";
import genericErrorHandler from "./middlewares/genericErrorHandler.middleware";
import nodeErrorHandler from "./middlewares/nodeErrorHandler.middleware";
import notFoundHandler from "./middlewares/notFoundHandler.middleware";
import routes from "./routes";
import { Logger, ILogger } from "./utils/logger";

export class Application {
  app: express.Application;
  config = config;
  logger: ILogger;

  constructor() {
    this.logger = new Logger(__filename);
    this.app = express();
    this.app.locals.name = this.config.name;
    this.app.locals.version = this.config.version;

    this.app.use(require("express-status-monitor")());
    this.app.use(cors());
    this.app.use(helmet());
    this.app.use(
      morgan("dev", {
        skip: () => process.env.NODE_ENV === "test"
      })
    );
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(new AuthHandler().initialize());

    this.app.use("/api", routes);
    this.app.use(genericErrorHandler);
    this.app.use(notFoundHandler);
  }

  setupDbAndServer = async () => {
    const conn = await createConnection();
    this.logger.info(
      `Connected to database. Connection: ${conn.name} / ${
        conn.options.database
      }`
    );
    await this.startServer();
  };

  startServer(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.app
        .listen(+this.config.port, this.config.host, () => {
          this.logger.info(
            `Server started at http://${this.config.host}:${this.config.port}`
          );
          resolve(true);
        })
        .on("error", nodeErrorHandler);
    });
  }
}
