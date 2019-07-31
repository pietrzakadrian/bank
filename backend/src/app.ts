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
          content: `<p>My name is <strong>Adrian Pietrzak</strong>.<br />I am a ${developerAge}-year-old developer and I focus on programming graphical user interfaces and scalable network applications ...</p>
          <p>... and you are exactly the X person who has the opportunity to test my software. :)</p>
          <p>Software development in JavaScript is one of my hobbies.<br />If you see <a href="https://github.com/pietrzakadrian/" target="_blank">my profile on GitHub</a>, you'll find that it fills most of my time.</p>
          <p>You see, I want to be an expert at it, that's why I have a great request for you:<br />Write me a message about what you think about this application.</p>
          <p>I am very interested in how you personally felt the project.<br />Maybe you found some mistake I do not know about?<br />Maybe you have an idea for expanding this project?<br />Maybe you think you could bring something to my life, or maybe <strong>we could start cooperation</strong>? ;)</p>
          <p>I give my e-mail address for you: <strong>contact@patrzakadrian.com</strong></p>
          <p>Thank you for agreeing to test my application. I am sending you 5,00 USD.<br />Be sure to check your transfers and change currency.</p>
          <p>Yours faithfully,<br />Adrian Pietrzak</p>`,
          actions: "Ok, I will send you my opinion",
          language: await languageService.getByCode("EN"),
          name: await configService.getByName("WELCOME_MESSAGE")
        },
        {
          subject: "Propozycja współpracy",
          content: `<p>Nazywam się <strong>Adrian Pietrzak</strong>. Jestem ${developerAge}-letnim developerem i koncentruję się na programowaniu graficznych interfejs&oacute;w użytkownika oraz skalowalnych aplikacji sieciowych...</p>
          <p>...a Ty jesteś dokładnie X osobą, kt&oacute;ra ma okazje przetestować moje oprogramowanie. :)</p>
          <p>Wytwarzanie oprogramowania w JavaScript to jedno z moich hobby. Jak zobaczysz m&oacute;j <a href="https://github.com/pietrzakadrian/" target="_blank">profil na GitHub</a>, przekonasz się, że to wypełnia większość mojego czasu.</p>
          <p>Widzisz, chcę być w tym bardzo dobry, dlatego mam do Ciebie wielką prośbę: <strong>napisz mi wiadomość</strong>, co sądzisz o tej aplikacji.</p>
          <p>Bardzo interesuje mnie, jak Ty osobiście odebrałeś ten projekt.<br />Może znalazłeś jakiś błąd, o kt&oacute;rym nie wiem?<br />Może masz pomysł na rozbudowanie tego projektu?<br />Może uważasz, że m&oacute;głbyś wnieść coś do mojego życia, a może <strong>moglibyśmy zacząć wsp&oacute;łpracować</strong>? ; )</p>
          <p>Zostawiam dla Ciebie m&oacute;j adres e-mail: <strong>contact@pietrzakadrian.com</strong></p>
          <p>Dziękuję, że zgodziłeś się przetestować moją aplikację. Przesyłam Tobie 5,00 USD.<br />Koniecznie sprawdź przelewy oraz zmianę waluty.</p>
          <p>Z wyrazami szacunku,<br />Adrian Pietrzak</p>`,
          actions: "Ok, wyślę Tobie moją opinię",
          language: await languageService.getByCode("PL"),
          name: await configService.getByName("WELCOME_MESSAGE")
        },
        {
          subject: "Kooperationsvorschlag",
          content: `<p>Ich hei&szlig;e <strong>Adrian Pietrzak</strong>. Ich bin ein ${developerAge}-j&auml;hriger Entwickler und konzentriere mich auf die Programmierung von grafischen Benutzeroberfl&auml;chen und skalierbaren Netzwerkanwendungen ...</p>
          <p>... und Sie sind genau die X Person, die M&ouml;glichkeit hat, meine Software zu testen. :)</p>
          <p>Softwareentwicklung in JavaScript ist eines meiner Hobbys. Wenn Sie mein <a href="https://github.com/pietrzakadrian/" target="_blank">Profil auf GitHub</a> sehen, werden Sie feststellen, dass es den gr&ouml;&szlig;ten Teil meiner Zeit ausf&uuml;llt.</p>
          <p>Sie sehen, ich m&ouml;chte sehr gut darin sein, deshalb habe ich eine gro&szlig;e Bitte an Sie: Schreiben Sie mir eine Nachricht, was Sie &uuml;ber diese Anwendung denken.</p>
          <p>Es interessiert mich sehr, wie Sie das Projekt pers&ouml;nlich erhalten haben.<br />Vielleicht haben Sie einen Fehler gefunden, von dem ich nichts wei&szlig;?<br />Vielleicht haben Sie eine Idee, dieses Projekt zu erweitern?<br />Vielleicht denkst du, du k&ouml;nntest etwas in mein Leben bringen, oder <strong>wir k&ouml;nnten Wert f&uuml;reinander schaffen</strong>? ; )</p>
          <p>Ich gebe meine E-Mail-Adresse f&uuml;r Sie an: <strong>contact@patrzakadrian.com</strong></p>
          <p>Vielen Dank, dass Sie zugestimmt haben, meine Anwendung zu testen. Ich schicke Ihnen 5,00 USD.<br />&Uuml;berpr&uuml;fen Sie unbedingt Ihre &Uuml;berweisungen und &auml;ndern Sie die W&auml;hrung.</p>
          <p>Hochachtungsvoll,<br />Adrian Pietrzak</p>`,
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
