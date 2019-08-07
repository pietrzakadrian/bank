import "reflect-metadata";
import bodyParser from "body-parser";
import { createServer, Server } from "http";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import { createConnection, getManager } from "typeorm";
import config from "./config/config";
import routes from "./routes";
import socketIo from "socket.io";
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
  private server: Server;
  config = config;
  logger: ILogger;
  CronJob = cron.CronJob;
  private io: SocketIO.Server;

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

    await this.createServer();
    await this.initSocket();
    await this.startServer();
    await this.setConfig();
    await this.setCurrencies();
    await this.setLanguages();
    await this.setTemplates();
    await this.setupCrons();
    await this.createAdmin();
    await this.createAuthor();
  };

  private createServer(): void {
    this.server = createServer(this.app);
  }

  private initSocket(): void {
    this.io = socketIo(this.server);
  }

  startServer = (): Promise<boolean> => {
    return new Promise((resolve, reject) => {
      this.app
        .listen(+this.config.port, this.config.host, () => {
          this.logger.info(
            `Server started at http://${this.config.host}:${this.config.port}`
          );
          resolve(true);
        })
        .on("error", nodeErrorHandler);

      this.io.on("connect", (socket: any) => {
        console.log("Connected client on port %s.", this.config.port);

        socket.on("new notification", (id: number) => {
          console.log("[server](message): %s", id);
          this.io.emit("new notification", id);
        });

        socket.on("disconnect", () => {
          console.log("Client disconnected");
        });
      });
    });
  };

  createAdmin = async (): Promise<any> => {
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
    const newConfigs: Array<object> = [
      { id: 1, name: "WELCOME_MESSAGE" },
      { id: 2, name: "REGISTER_TRANSACTION" }
    ];

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
      const WELCOME_MESSAGE = await configService.getByName("WELCOME_MESSAGE");
      const REGISTER_TRANSACTION = await configService.getByName(
        "REGISTER_TRANSACTION"
      );
      const PL = await languageService.getByCode("PL");
      const DE = await languageService.getByCode("DE");
      const EN = await languageService.getByCode("EN");

      const newTemplates: Array<object> = [
        {
          subject: "Cooperation proposal",
          content: `<p>My name is <strong>Adrian Pietrzak</strong>. <br>I am a ${developerAge}-year-old developer and I focus on programming graphical user interfaces and scalable web applications ...</p>
          <p>... and you are exactly the X person who has the opportunity to test my software. :)</p>
          <p>Software development in JavaScript is one of my hobbies.<br />If you see <a href="https://github.com/pietrzakadrian" target="_blank" style="color: #15a0dd">my profile on GitHub</a>, you'll find that it fills most of my time.</p>
          <p>You see, I want to be an expert at it, that's why I have a great request for you: <strong>Write me a message</strong> about what you think about this application.</p>
          <p>I am very interested in how you personally felt the project.<br />Maybe you found some mistake I do not know about?<br />Maybe you have an idea for expanding this project?<br />Maybe you think you could help me with something or maybe <strong>we could start cooperation</strong>? ; )</p>
          <p>I give my e-mail address for you: <strong>contact@pietrzakadrian.com</strong></p>
          <p>Thank you for agreeing to test my application. I am sending you 5,00 USD. Be sure to check your transfers and change currency.</p>
          <p>Yours faithfully,<br />Adrian Pietrzak</p>`,
          actions: "Ok, I will send you my opinion",
          language: EN,
          name: WELCOME_MESSAGE
        },
        {
          subject: "Propozycja współpracy",
          content: `<p>Nazywam się <strong>Adrian Pietrzak</strong>. <br>Jestem ${developerAge}-letnim programistą i skupiam się na programowaniu graficznych interfejs&oacute;w użytkownika i skalowalnych aplikacji sieciowych ...</p>
          <p>... i jesteś dokładnie X osobą, kt&oacute;ra ma okazję przetestować moje oprogramowanie. :)</p>
          <p>Wytwarzanie oprogramowania w JavaScript jest jednym z moich hobby.<br />Jak zobaczysz <a href="https://github.com/pietrzakadrian" target="_blank" style="color: #15a0dd">m&oacute;j profil na GitHub</a>, przekonasz się, że wypełnia to większość mojego czasu.</p>
          <p>Widzisz, chcę być w tym bardzo dobry, dlatego mam do Ciebie wielką prośbę: <strong>Napisz mi wiadomość</strong>, co myślisz o tej aplikacji.</p>
          <p>Jestem bardzo zainteresowany tym, jak osobiście odczułeś ten projekt.<br />Może znalazłeś błąd, o kt&oacute;rym nie wiem?<br />Może masz pomysł na rozszerzenie tego projektu?<br />Może myślisz, że możesz mi w czymś pom&oacute;c, a może <strong>moglibyśmy rozpocząć wsp&oacute;łpracę</strong>? ;)</p>
          <p>Podaję m&oacute;j adres e-mail: <strong>contact@pietrzakadrian.com</strong></p>
          <p>Dziękuję, że zgodziłeś się na przetestowanie mojej aplikacji. Przesyłam Ci 5,00 USD. Sprawdź swoje przelewy i zmianę waluty.</p>
          <p>Z poważaniem,<br />Adrian Pietrzak</p>`,
          actions: "Ok, wyślę Tobie moją opinię",
          language: PL,
          name: WELCOME_MESSAGE
        },
        {
          subject: "Kooperationsvorschlag",
          content: `<p>Ich hei&szlig;e <strong>Adrian Pietrzak</strong>. <br>Ich bin ein ${developerAge}-j&auml;hriger Entwickler und konzentriere mich auf die Programmierung von grafischen Benutzeroberfl&auml;chen und skalierbaren Netzwerkanwendungen ...</p>
          <p>... und Sie sind genau die X Person, die M&ouml;glichkeit hat, meine Software zu testen. :)</p>
          <p>Softwareentwicklung in JavaScript ist eines meiner Hobbys. Wenn Sie mein <a href="https://github.com/pietrzakadrian" target="_blank" style="color: #15a0dd">Profil auf GitHub</a> sehen, werden Sie feststellen, dass es den gr&ouml;&szlig;ten Teil meiner Zeit ausf&uuml;llt.</p>
          <p>Sie sehen, ich m&ouml;chte sehr gut darin sein, deshalb habe ich eine gro&szlig;e Bitte an Sie: <strong>Schreiben Sie mir eine Nachricht</strong>, was Sie &uuml;ber diese Anwendung denken.</p>
          <p>Es interessiert mich sehr, wie Sie das Projekt pers&ouml;nlich erhalten haben.<br />Vielleicht haben Sie einen Fehler gefunden, von dem ich nichts wei&szlig;?<br />Vielleicht haben Sie eine Idee, dieses Projekt zu erweitern?<br />Vielleicht denkst du, du k&ouml;nntest etwas in mein Leben bringen, oder <strong>wir k&ouml;nnten Wert f&uuml;reinander schaffen</strong>? ; )</p>
          <p>Ich gebe meine E-Mail-Adresse f&uuml;r Sie an: <strong>contact@pietrzakadrian.com</strong></p>
          <p>Vielen Dank, dass Sie zugestimmt haben, meine Anwendung zu testen. Ich schicke Ihnen 5,00 USD.<br />&Uuml;berpr&uuml;fen Sie unbedingt Ihre &Uuml;berweisungen und &auml;ndern Sie die W&auml;hrung.</p>
          <p>Hochachtungsvoll,<br />Adrian Pietrzak</p>`,
          actions: "Ok, ich sende dir meine Meinung",
          language: DE,
          name: WELCOME_MESSAGE
        },
        {
          subject: "Payment authorization",
          language: EN,
          name: REGISTER_TRANSACTION,
          content: `<!doctype html> <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office"> <head> <title></title> <meta http-equiv="X-UA-Compatible" content="IE=edge"> <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"> <meta name="viewport" content="width=device-width, initial-scale=1"> <style type="text/css"> #outlook a{padding: 0;}.ReadMsgBody{width: 100%;}.ExternalClass{width: 100%;}.ExternalClass *{line-height: 100%;}body{margin: 0; padding: 0; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%;}table, td{border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt;}img{border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; -ms-interpolation-mode: bicubic;}p{display: block; margin: 13px 0;}</style> <style type="text/css"> @media only screen and (max-width:480px){@-ms-viewport{width: 320px;}@viewport{width: 320px;}}</style><!--[if mso]> <xml> <o:OfficeDocumentSettings> <o:AllowPNG/> <o:PixelsPerInch>96</o:PixelsPerInch> </o:OfficeDocumentSettings> </xml><![endif]--><!--[if lte mso 11]> <style type="text/css"> .outlook-group-fix{width:100% !important;}</style><![endif]--> <style type="text/css"> @media only screen and (min-width:480px){.mj-column-per-100{width: 100% !important; max-width: 100%;}}</style> <style type="text/css"> @media only screen and (max-width:480px){table.full-width-mobile{width: 100% !important;}td.full-width-mobile{width: auto !important;}}</style> </head> <body> <div><!--[if mso | IE]> <table align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600" > <tr> <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]--> <div style="Margin:0px auto;max-width:600px;"> <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;"> <tbody> <tr> <td style="direction:ltr;font-size:0px;padding:20px 0;text-align:center;vertical-align:top;"><!--[if mso | IE]> <table role="presentation" border="0" cellpadding="0" cellspacing="0"> <tr> <td class="" style="vertical-align:top;width:600px;" ><![endif]--> <div class="mj-column-per-100 outlook-group-fix" style="font-size:13px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;"> <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%"> <tr> <td align="center" style="font-size:0px;padding:10px 25px;word-break:break-word;"> <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:collapse;border-spacing:0px;"> <tbody> <tr> <td style="width:200px;"> <img height="auto" src="https://raw.githubusercontent.com/pietrzakadrian/bank/1.1/.github/logo.png" style="border:0;display:block;outline:none;text-decoration:none;height:auto;width:100%;" width="200"/> </td></tr></tbody> </table> </td></tr><tr> <td style="font-size:0px;padding:10px 25px;word-break:break-word;"> <p style="border-top:solid 4px #15a0dd;font-size:1;margin:0px auto;width:100%;"> </p><!--[if mso | IE]> <table align="center" border="0" cellpadding="0" cellspacing="0" style="border-top:solid 4px #15a0dd;font-size:1;margin:0px auto;width:550px;" role="presentation" width="550px" > <tr> <td style="height:0;line-height:0;"> &nbsp; </td></tr></table><![endif]--> </td></tr><tr> <td align="left" style="font-size:0px;padding:10px 25px;word-break:break-word;"> <div style="font-family:helvetica;font-size:16px;line-height:1;text-align:left;color:black;"> Dear Customer! <br/> We have registered an attempt to make a payment for the amount of AMOUNT_MONEY CURRENCY_NAME to RECIPIENT_NAME. <br/><br/> Confirm the payment by entering the authorization key: <b>AUTHORIZATION_KEY</b> </div></td></tr><tr> <td style="font-size:0px;padding:10px 25px;word-break:break-word;"> <p style="border-top:solid 4px #15a0dd;font-size:1;margin:0px auto;width:100%;"> </p><!--[if mso | IE]> <table align="center" border="0" cellpadding="0" cellspacing="0" style="border-top:solid 4px #15a0dd;font-size:1;margin:0px auto;width:550px;" role="presentation" width="550px" > <tr> <td style="height:0;line-height:0;"> &nbsp; </td></tr></table><![endif]--> </td></tr><tr> <td align="left" style="font-size:0px;padding:10px 25px;word-break:break-word;"> <div style="font-family:helvetica;font-size:16px;line-height:1;text-align:left;color:black;"> Thank you for using our banking services. </div></td></tr></table> </div><!--[if mso | IE]> </td></tr></table><![endif]--> </td></tr></tbody> </table> </div><!--[if mso | IE]> </td></tr></table><![endif]--> </div></body> </html>`
        },
        {
          subject: "Autoryzacja płatności",
          language: PL,
          name: REGISTER_TRANSACTION,
          content: `<!doctype html> <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office"> <head> <title></title> <meta http-equiv="X-UA-Compatible" content="IE=edge"> <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"> <meta name="viewport" content="width=device-width, initial-scale=1"> <style type="text/css"> #outlook a{padding: 0;}.ReadMsgBody{width: 100%;}.ExternalClass{width: 100%;}.ExternalClass *{line-height: 100%;}body{margin: 0; padding: 0; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%;}table, td{border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt;}img{border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; -ms-interpolation-mode: bicubic;}p{display: block; margin: 13px 0;}</style> <style type="text/css"> @media only screen and (max-width:480px){@-ms-viewport{width: 320px;}@viewport{width: 320px;}}</style><!--[if mso]> <xml> <o:OfficeDocumentSettings> <o:AllowPNG/> <o:PixelsPerInch>96</o:PixelsPerInch> </o:OfficeDocumentSettings> </xml><![endif]--><!--[if lte mso 11]> <style type="text/css"> .outlook-group-fix{width:100% !important;}</style><![endif]--> <style type="text/css"> @media only screen and (min-width:480px){.mj-column-per-100{width: 100% !important; max-width: 100%;}}</style> <style type="text/css"> @media only screen and (max-width:480px){table.full-width-mobile{width: 100% !important;}td.full-width-mobile{width: auto !important;}}</style> </head> <body> <div><!--[if mso | IE]> <table align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600" > <tr> <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]--> <div style="Margin:0px auto;max-width:600px;"> <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;"> <tbody> <tr> <td style="direction:ltr;font-size:0px;padding:20px 0;text-align:center;vertical-align:top;"><!--[if mso | IE]> <table role="presentation" border="0" cellpadding="0" cellspacing="0"> <tr> <td class="" style="vertical-align:top;width:600px;" ><![endif]--> <div class="mj-column-per-100 outlook-group-fix" style="font-size:13px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;"> <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%"> <tr> <td align="center" style="font-size:0px;padding:10px 25px;word-break:break-word;"> <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:collapse;border-spacing:0px;"> <tbody> <tr> <td style="width:200px;"> <img height="auto" src="https://raw.githubusercontent.com/pietrzakadrian/bank/1.1/.github/logo.png" style="border:0;display:block;outline:none;text-decoration:none;height:auto;width:100%;" width="200"/> </td></tr></tbody> </table> </td></tr><tr> <td style="font-size:0px;padding:10px 25px;word-break:break-word;"> <p style="border-top:solid 4px #15a0dd;font-size:1;margin:0px auto;width:100%;"> </p><!--[if mso | IE]> <table align="center" border="0" cellpadding="0" cellspacing="0" style="border-top:solid 4px #15a0dd;font-size:1;margin:0px auto;width:550px;" role="presentation" width="550px" > <tr> <td style="height:0;line-height:0;"> &nbsp; </td></tr></table><![endif]--> </td></tr><tr> <td align="left" style="font-size:0px;padding:10px 25px;word-break:break-word;"> <div style="font-family:helvetica;font-size:16px;line-height:1;text-align:left;color:black;">Drogi Kliencie! <br/> Zarejestrowaliśmy próbę dokonania płatności na kwotę: AMOUNT_MONEY CURRENCY_NAME dla RECIPIENT_NAME. <br/><br/> Potwierdź płatność, wprowadzając klucz autoryzacyjny: <b>AUTHORIZATION_KEY</b> </div></td></tr><tr> <td style="font-size:0px;padding:10px 25px;word-break:break-word;"> <p style="border-top:solid 4px #15a0dd;font-size:1;margin:0px auto;width:100%;"> </p><!--[if mso | IE]> <table align="center" border="0" cellpadding="0" cellspacing="0" style="border-top:solid 4px #15a0dd;font-size:1;margin:0px auto;width:550px;" role="presentation" width="550px" > <tr> <td style="height:0;line-height:0;"> &nbsp; </td></tr></table><![endif]--> </td></tr><tr> <td align="left" style="font-size:0px;padding:10px 25px;word-break:break-word;"> <div style="font-family:helvetica;font-size:16px;line-height:1;text-align:left;color:black;">Dziękujemy za skorzystanie z naszych usług bankowych. </div></td></tr></table> </div><!--[if mso | IE]> </td></tr></table><![endif]--> </td></tr></tbody> </table> </div><!--[if mso | IE]> </td></tr></table><![endif]--> </div></body> </html>`
        },
        {
          subject: "Zahlungsermächtigung",
          language: DE,
          name: REGISTER_TRANSACTION,
          content: `<!doctype html> <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office"> <head> <title></title> <meta http-equiv="X-UA-Compatible" content="IE=edge"> <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"> <meta name="viewport" content="width=device-width, initial-scale=1"> <style type="text/css"> #outlook a{padding: 0;}.ReadMsgBody{width: 100%;}.ExternalClass{width: 100%;}.ExternalClass *{line-height: 100%;}body{margin: 0; padding: 0; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%;}table, td{border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt;}img{border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; -ms-interpolation-mode: bicubic;}p{display: block; margin: 13px 0;}</style> <style type="text/css"> @media only screen and (max-width:480px){@-ms-viewport{width: 320px;}@viewport{width: 320px;}}</style><!--[if mso]> <xml> <o:OfficeDocumentSettings> <o:AllowPNG/> <o:PixelsPerInch>96</o:PixelsPerInch> </o:OfficeDocumentSettings> </xml><![endif]--><!--[if lte mso 11]> <style type="text/css"> .outlook-group-fix{width:100% !important;}</style><![endif]--> <style type="text/css"> @media only screen and (min-width:480px){.mj-column-per-100{width: 100% !important; max-width: 100%;}}</style> <style type="text/css"> @media only screen and (max-width:480px){table.full-width-mobile{width: 100% !important;}td.full-width-mobile{width: auto !important;}}</style> </head> <body> <div><!--[if mso | IE]> <table align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600" > <tr> <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]--> <div style="Margin:0px auto;max-width:600px;"> <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;"> <tbody> <tr> <td style="direction:ltr;font-size:0px;padding:20px 0;text-align:center;vertical-align:top;"><!--[if mso | IE]> <table role="presentation" border="0" cellpadding="0" cellspacing="0"> <tr> <td class="" style="vertical-align:top;width:600px;" ><![endif]--> <div class="mj-column-per-100 outlook-group-fix" style="font-size:13px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;"> <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%"> <tr> <td align="center" style="font-size:0px;padding:10px 25px;word-break:break-word;"> <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:collapse;border-spacing:0px;"> <tbody> <tr> <td style="width:200px;"> <img height="auto" src="https://raw.githubusercontent.com/pietrzakadrian/bank/1.1/.github/logo.png" style="border:0;display:block;outline:none;text-decoration:none;height:auto;width:100%;" width="200"/> </td></tr></tbody> </table> </td></tr><tr> <td style="font-size:0px;padding:10px 25px;word-break:break-word;"> <p style="border-top:solid 4px #15a0dd;font-size:1;margin:0px auto;width:100%;"> </p><!--[if mso | IE]> <table align="center" border="0" cellpadding="0" cellspacing="0" style="border-top:solid 4px #15a0dd;font-size:1;margin:0px auto;width:550px;" role="presentation" width="550px" > <tr> <td style="height:0;line-height:0;"> &nbsp; </td></tr></table><![endif]--> </td></tr><tr> <td align="left" style="font-size:0px;padding:10px 25px;word-break:break-word;"> <div style="font-family:helvetica;font-size:16px;line-height:1;text-align:left;color:black;">Sehr geehrter Kunde!<br/> Wir haben einen Zahlungsversuch registriert für den Betrag von: AMOUNT_MONEY CURRENCY_NAME bis RECIPIENT_NAME. <br/><br/> Bestätigen Sie die Zahlung durch Eingabe des Autorisierungsschlüssels: <b>AUTHORIZATION_KEY</b> </div></td></tr><tr> <td style="font-size:0px;padding:10px 25px;word-break:break-word;"> <p style="border-top:solid 4px #15a0dd;font-size:1;margin:0px auto;width:100%;"> </p><!--[if mso | IE]> <table align="center" border="0" cellpadding="0" cellspacing="0" style="border-top:solid 4px #15a0dd;font-size:1;margin:0px auto;width:550px;" role="presentation" width="550px" > <tr> <td style="height:0;line-height:0;"> &nbsp; </td></tr></table><![endif]--> </td></tr><tr> <td align="left" style="font-size:0px;padding:10px 25px;word-break:break-word;"> <div style="font-family:helvetica;font-size:16px;line-height:1;text-align:left;color:black;">Vielen Dank, dass Sie unsere Bankdienstleistungen in Anspruch genommen haben.</div></td></tr></table> </div><!--[if mso | IE]> </td></tr></table><![endif]--> </td></tr></tbody> </table> </div><!--[if mso | IE]> </td></tr></table><![endif]--> </div></body> </html>`
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
