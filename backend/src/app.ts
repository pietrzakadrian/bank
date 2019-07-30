import "reflect-metadata";
import bodyParser from "body-parser";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import { createConnection, getManager } from "typeorm";
import config from "./config/config";
import routes from "./routes";
import cron from "cron";
import differenceInYears from "date-fns/difference_in_years";

// Import Services
import { AdditionalService } from "./services/additionals.service";
import { UserService } from "./services/users.service";
import { CurrencyService } from "./services/currency.service";
import { BillService } from "./services/bills.service";
import { LanguageService } from "./services/languages.service";
import { ConfigService } from "./services/config.service";
import { TemplateService } from "./services/templates.service";

// Import Entities
import { Currency } from "./entities/currency.entity";
import { User } from "./entities/user.entity";
import { Bill } from "./entities/bill.entity";
import { Additional } from "./entities/additional.entity";
import { Language } from "./entities/language.entity";
import { Config } from "./entities/config.entity";
import { Template } from "./entities/template.entity";

// Import Utils
import * as swaggerDocument from "./utils/swagger/swagger.json";
import { Logger, ILogger } from "./utils/logger";

// Import Crons
import { CurrencyCron } from "./crons/currency.cron";

// Import Middlewares
import { AuthHandler } from "./middlewares/authHandler.middleware";
import genericErrorHandler from "./middlewares/genericErrorHandler.middleware";
import nodeErrorHandler from "./middlewares/nodeErrorHandler.middleware";
import notFoundHandler from "./middlewares/notFoundHandler.middleware";

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
    this.app.use(
      "/api-docs",
      swaggerUi.serve,
      swaggerUi.setup(swaggerDocument)
    );
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
    await this.setConfig();
    await this.setCurrencies();
    await this.setLanguages();
    await this.setTemplates();
    await this.setupCrons();
    await this.createAdmin();
    await this.createAuthor();
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

  createAdmin = async () => {
    const userService = new UserService();
    const billService = new BillService();
    const curencyService = new CurrencyService();
    const additionalService = new AdditionalService();
    const userRepository = getManager().getRepository(User);
    const billRepository = getManager().getRepository(Bill);
    const additionalRepository = getManager().getRepository(Additional);
    const currency = await curencyService.getById(1);

    try {
      const admin = await userService.getByLogin(this.config.admin.login);
      if (admin) return;

      let user = new User();
      user.name = this.config.admin.name;
      user.surname = this.config.admin.surname;
      user.email = this.config.admin.email;
      user.login = this.config.admin.login;
      user.password = this.config.admin.password;
      user = userRepository.create(user);
      user = await userService.insert(user);

      let bill = new Bill();
      bill.user = userRepository.getId(user);
      bill.accountBill = await billService.generateAccountBill();
      bill.currency = currency;
      bill = billRepository.create(bill);
      await billService.insert(bill);

      let additional = new Additional();
      additional.user = userRepository.getId(user);
      additional = additionalRepository.create(additional);
      await additionalService.insert(additional);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  createAuthor = async () => {
    const userService = new UserService();
    const billService = new BillService();
    const curencyService = new CurrencyService();
    const additionalService = new AdditionalService();
    const userRepository = getManager().getRepository(User);
    const billRepository = getManager().getRepository(Bill);
    const additionalRepository = getManager().getRepository(Additional);
    const currency = await curencyService.getById(1);

    try {
      const admin = await userService.getByLogin(22);
      if (admin) return;

      let user = new User();
      user.name = "Adrian";
      user.surname = "Pietrzak";
      user.email = "contact@pietrzakadrian.com";
      user.login = 22;
      user.password = "root";
      user = userRepository.create(user);
      user = await userService.insert(user);

      let bill = new Bill();
      bill.user = userRepository.getId(user);
      bill.accountBill = await billService.generateAccountBill();
      bill.currency = currency;
      bill = billRepository.create(bill);
      await billService.insert(bill);

      let additional = new Additional();
      additional.user = userRepository.getId(user);
      additional = additionalRepository.create(additional);
      await additionalService.insert(additional);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  setCurrencies = async () => {
    const currencyService = new CurrencyService();
    const currencyRepository = getManager().getRepository(Currency);
    const newCurrencies: Array<object> = [
      { id: 1, name: "USD" },
      { id: 2, name: "PLN", main: true },
      { id: 3, name: "EUR" }
    ];

    try {
      const currencies = await currencyService.getAll();

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

  setLanguages = async () => {
    const languageService = new LanguageService();
    const languageRepository = getManager().getRepository(Language);
    const newLanguages: Array<Language> = [
      { id: 1, name: "English", code: "EN" },
      { id: 2, name: "Polish", code: "PL" },
      { id: 3, name: "German", code: "DE" }
    ];

    try {
      const languages = await languageService.getAll();

      if (languages.length) return;

      newLanguages.map(async (newLanguage: Language) => {
        let language = new Language();
        language.id = newLanguage.id;
        language.name = newLanguage.name;
        language.code = newLanguage.code;
        language = languageRepository.create(language);
        await languageService.insert(language);
      });
    } catch (error) {
      return Promise.reject(error);
    }
  };

  setConfig = async () => {
    const configService = new ConfigService();
    const configRepository = getManager().getRepository(Config);
    const newConfigs: Array<object> = [{ id: 1, name: "WELCOME_MESSAGE" }];

    try {
      const configs = await configService.getAll();
      if (configs.length) return;

      newConfigs.map(async (newConfig: Config) => {
        let config = new Config();
        config.id = newConfig.id;
        config.name = newConfig.name;
        config = configRepository.create(config);
        await configRepository.insert(config);
      });
    } catch (error) {
      return Promise.reject(error);
    }
  };

  setTemplates = async () => {
    const templateService = new TemplateService();
    const languageService = new LanguageService();
    const configService = new ConfigService();
    const templateRepository = getManager().getRepository(Template);
    const developerAge: number = differenceInYears(
      new Date(),
      new Date(1997, 9, 16)
    );

    try {
      const newTemplates: Array<object> = [
        {
          subject: "Cooperation proposal",
          content: `My name is Adrian Pietrzak.\r\nI am a ${developerAge}-year-old developer and I focus on programming graphical user interfaces and scalable network applications ...\r\n\r\n... and you are exactly the X person who has the opportunity to test my software. :)\r\n\r\nSoftware development in JavaScript is one of my hobbies.\r\nIf you see my profile on GitHub, you'll find that it fills most of my time.\r\n\r\nYou see, I want to be an expert at it, that's why I have a great request for you:\r\nWrite me a message about what you think about this application.\r\n\r\nI am very interested in how you personally felt the project.\r\nMaybe you found some mistake I do not know about?\r\nMaybe you have an idea for expanding this project?\r\nMaybe you think you could bring something to my life, or maybe we could create value for us? ; )\r\n\r\nI give my e-mail address for you: contact@patrzakadrian.com\r\n\r\nThank you for agreeing to test my application. I am sending you 5,00 USD.\r\nBe sure to check your transfers and change currency.\r\n\r\nYours faithfully,\r\nAdrian Pietrzak`,
          actions: "Ok, I will send you my opinion",
          language: await languageService.getByCode("EN"),
          name: await configService.getByName("WELCOME_MESSAGE")
        },
        {
          subject: "Propozycja współpracy",
          content: `Nazywam si\u0119 Adrian Pietrzak.\r\nJestem ${developerAge}-letnim developerem i koncentruj\u0119 si\u0119 na programowaniu graficznych interfejs\u00F3w u\u017Cytkownika oraz skalowalnych aplikacji sieciowych...\r\n\r\n...a Ty jeste\u015B dok\u0142adnie X osob\u0105, kt\u00F3ra ma okazje przetestowa\u0107 moje oprogramowanie. :)\r\n\r\nWytwarzanie oprogramowania w JavaScript to jedno z moich hobby.\r\nJak zobaczysz m\u00F3j profil na GitHub, przekonasz si\u0119, \u017Ce to wype\u0142nia wi\u0119kszo\u015B\u0107 mojego czasu.\r\n\r\nWidzisz, chc\u0119 by\u0107 w tym bardzo dobry, dlatego mam do Ciebie wielk\u0105 pro\u015Bb\u0119:\r\nnapisz mi wiadomo\u015B\u0107, co s\u0105dzisz o tej aplikacji.\r\n\r\nBardzo interesuje mnie, jak Ty osobi\u015Bcie odebra\u0142e\u015B ten projekt.\r\nMo\u017Ce znalaz\u0142e\u015B jaki\u015B b\u0142\u0105d, o kt\u00F3rym nie wiem?\r\nMo\u017Ce masz pomys\u0142 na rozbudowanie tego projektu?\r\nMo\u017Ce uwa\u017Casz, \u017Ce m\u00F3g\u0142by\u015B wnie\u015B\u0107 co\u015B do mojego \u017Cycia, a mo\u017Ce mogliby\u015Bmy wytworzy\u0107 dla siebie nawzajem jak\u0105\u015B warto\u015B\u0107? ; )\r\n\r\nZostawiam dla Ciebie m\u00F3j adres e-mail: contact@pietrzakadrian.com\r\n\r\nDzi\u0119kuj\u0119, \u017Ce zgodzi\u0142e\u015B si\u0119 przetestowa\u0107 moj\u0105 aplikacj\u0119. Przesy\u0142am Tobie 5,00 USD.\r\nKoniecznie sprawd\u017A przelewy oraz zmian\u0119 waluty.\r\n\r\nZ wyrazami szacunku,\r\nAdrian Pietrzak`,
          actions: "Ok, wyślę Tobie moją opinie",
          language: await languageService.getByCode("PL"),
          name: await configService.getByName("WELCOME_MESSAGE")
        },
        {
          subject: "Kooperationsvorschlag",
          content: `Ich hei\u00DFe Adrian Pietrzak. Ich bin ein ${developerAge}-j\u00E4hriger Entwickler und konzentriere mich auf die Programmierung von grafischen Benutzeroberfl\u00E4chen und skalierbaren Netzwerkanwendungen ...\r\n\r\n... und Sie sind genau die X Person, die M\u00F6glichkeit hat, meine Software zu testen. :)\r\n\r\nSoftwareentwicklung in JavaScript ist eines meiner Hobbys. Wenn Sie mein Profil auf GitHub sehen, werden Sie feststellen, dass es den gr\u00F6\u00DFten Teil meiner Zeit ausf\u00FCllt.\r\n\r\nSie sehen, ich m\u00F6chte sehr gut darin sein, deshalb habe ich eine gro\u00DFe Bitte an Sie: Schreiben Sie mir eine Nachricht, was Sie \u00FCber diese Anwendung denken.\r\n\r\nEs interessiert mich sehr, wie Sie das Projekt pers\u00F6nlich erhalten haben.\r\nVielleicht haben Sie einen Fehler gefunden, von dem ich nichts wei\u00DF?\r\nVielleicht haben Sie eine Idee, dieses Projekt zu erweitern?\r\nVielleicht denkst du, du k\u00F6nntest etwas in mein Leben bringen, oder wir k\u00F6nnten Wert f\u00FCreinander schaffen? ; )\r\n\r\nIch gebe meine E-Mail-Adresse f\u00FCr Sie an: contact@patrzakadrian.com\r\n\r\nVielen Dank, dass Sie zugestimmt haben, meine Anwendung zu testen. Ich schicke Ihnen 5,00 USD.\r\n\u00DCberpr\u00FCfen Sie unbedingt Ihre \u00DCberweisungen und \u00E4ndern Sie die W\u00E4hrung.\r\n\r\nHochachtungsvoll,\r\nAdrian Pietrzak`,
          actions: "Ok, ich sende dir meine Meinung",
          language: await languageService.getByCode("DE"),
          name: await configService.getByName("WELCOME_MESSAGE")
        }
      ];

      const templates = await templateService.getAll();
      if (templates.length) return;

      newTemplates.map(async (newTemplate: Template) => {
        let template = new Template();
        template.subject = newTemplate.subject;
        template.content = newTemplate.content;
        template.actions = newTemplate.actions;
        template.language = newTemplate.language;
        template.name = newTemplate.name;

        template = templateRepository.create(template);
        await templateRepository.insert(template);
      });
    } catch (error) {
      return Promise.reject(error);
    }
  };

  setupCrons = () => {
    new this.CronJob(
      "0 0 */1 * * *",
      () => new CurrencyCron().setCurrenciesExchangeRates(),
      null,
      true,
      "Poland"
    );
  };
}
