import { MailService } from "./mail.service";
import { Language } from "../entities/language.entity";
import { ConfigService } from "./config.service";
import { Config } from "../entities/config.entity";
import { TemplateService } from "./templates.service";
import { Template } from "../entities/template.entity";

export class SenderService {
  async sendPaymentMail(to: string, language: Language) {
    const configService = new ConfigService();
    const templateService = new TemplateService();
    const mailService = new MailService();
    const config: Config = await configService.getByName(
      "REGISTER_TRANSACTION"
    );
    const template: Template = await templateService.getTemplate(
      language,
      config
    );
    const subject: string = template.subject;
    const content: string = template.content;

    try {
      await mailService.sendMail(to, subject, "test", content);
    } catch (error) {
      Promise.reject(error);
    }
  }
}
