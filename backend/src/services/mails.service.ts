import {
  GMailServiceDi,
  IGMailServiceDi,
  IIGMailServiceDi
} from "./gmailDi.service";
import { ServiceLocatorGeneric } from "./locator.service";
import { IISystemSettings } from "../resources/interfaces/ISystemSettings.interface";
import { ConstructorInject } from "../resources/decorators/constructorInject.decorator";
import { Language } from "../entities/language.entity";
import { ConfigService } from "./config.service";
import { Config } from "../entities/config.entity";
import { TemplateService } from "./templates.service";
import { Template } from "../entities/template.entity";

ServiceLocatorGeneric.register(IISystemSettings, {
  SmtpServerConnectionString: "smtp.gmail.com",
  SmtpFromAddress: "smtp_from@test.com"
});

ServiceLocatorGeneric.register(IIGMailServiceDi, new GMailServiceDi());

@ConstructorInject
export class MailSender {
  private gMailService: IGMailServiceDi;

  constructor(gMailService?: IIGMailServiceDi) {}

  async sendPaymentMail(to: string, language: Language) {
    const configService = new ConfigService();
    const templateService = new TemplateService();
    const config: Config = await configService.getByName(
      "REGISTER_TRANSACTION"
    );
    console.log(config);
    const template: Template = await templateService.getOne(language, config);
    const subject: string = template.subject;
    const content: string = template.content;

    await this.gMailService.sendMail(to, subject, "test", content);
  }
}
