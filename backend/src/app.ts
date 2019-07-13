import "reflect-metadata";

import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import { createConnection, getManager } from "typeorm";
import config from "./config/config";
import { AuthHandler } from "./middlewares/authHandler.middleware";
import genericErrorHandler from "./middlewares/genericErrorHandler.middleware";
import nodeErrorHandler from "./middlewares/nodeErrorHandler.middleware";
import notFoundHandler from "./middlewares/notFoundHandler.middleware";
import routes from "./routes";
import { Logger, ILogger } from "./utils/logger";
import { CurrencyService } from "./services/currency.service";
import { Currency } from "./entities/currency.entity";
import { CurrencyCron } from "./crons/currency.cron";
import cron from "cron";

export class Application {
  app: express.Application;
  config = config;
  logger: ILogger;
  CronJob = cron.CronJob;

  constructor() {
    this.logger = new Logger(__filename);
    this.app = express();

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
    await this.setCurrencies();
    this.runCrons();
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

  setCurrencies = async () => {
    const currencyService = new CurrencyService();

    try {
      const currencies = await currencyService.getAll();
      const currencyRepository = getManager().getRepository(Currency);
      const newCurrencies = [
        {
          id: 1,
          name: "USD"
        },
        {
          id: 2,
          name: "PLN",
          main: true
        },
        {
          id: 3,
          name: "EUR"
        }
      ];

      if (currencies.length)
        return new CurrencyCron().setCurrenciesExchangeRates();

      newCurrencies.map(async (newCurrency: Currency) => {
        let currency = new Currency();
        currency.id = newCurrency.id;
        currency.name = newCurrency.name;
        currency.main = newCurrency.main;
        currency = currencyRepository.create(currency);
        await currencyService.insert(currency);
      });

      return new CurrencyCron().setCurrenciesExchangeRates();
    } catch (error) {
      return Promise.reject(error);
    }
  };

  runCrons = () => {
    new this.CronJob(
      "0 0 */1 * * *",
      () => new CurrencyCron().setCurrenciesExchangeRates(),
      null,
      true,
      "Poland"
    );
  };
}
