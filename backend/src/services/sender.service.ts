// Import Services
import { TemplateService } from "./templates.service";
import { ConfigService } from "./config.service";
import { MailService } from "./mail.service";
import { CurrencyService } from "./currency.service";

// Import Entities
import { Language } from "../entities/language.entity";
import { Config } from "../entities/config.entity";
import { Template } from "../entities/template.entity";
import { Currency } from "../entities/currency.entity";
import { User } from "../entities/user.entity";

export class SenderService {
  async sendPaymentMail(
    to: string,
    language: Language,
    currency: Currency,
    recipient: User,
    authorizationKey: string,
    amountMoney: number
  ) {
    const configService = new ConfigService();
    const templateService = new TemplateService();
    const mailService = new MailService();
    const currencyName: Currency["name"] = currency.name;

    try {
      const config: Config = await configService.getByName(
        "REGISTER_TRANSACTION"
      );
      const template: Template = await templateService.getTemplate(
        language,
        config
      );
      const subject: string = template.subject;
      const content: string = template.content
        .replace(
          "AMOUNT_MONEY",
          amountMoney
            .toFixed(2)
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, " ")
            .replace(".", ",")
        )
        .replace("CURRENCY_NAME", currencyName)
        .replace("RECIPIENT_NAME", `${recipient.name} ${recipient.surname}`)
        .replace("AUTHORIZATION_KEY", authorizationKey);

      await mailService.sendMail(to, subject, "test", content);
    } catch (error) {
      Promise.reject(error);
    }
  }
}
