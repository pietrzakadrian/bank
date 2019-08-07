import * as nodemailer from "nodemailer";
import { ISystemSettings } from "../resources/interfaces/ISystemSettings.interface";
import { ServiceLocator } from "./locator.service";
import config from "../config/config";

export default class GMailService {
  private _transporter: nodemailer.Transporter;
  private _settings: ISystemSettings;
  config = config;

  constructor() {
    this._settings = ServiceLocator.resolve("ISystemSettings");
    this._transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: this.config.admin.email,
        pass: this.config.admin.password
      }
    });
  }
  sendMail(
    to: string,
    subject: string,
    content: string,
    html: string
  ): Promise<void> {
    let options = {
      from: this.config.admin.email,
      to: to,
      subject: subject,
      text: content,
      html: html
    };

    return new Promise<void>(
      (resolve: (msg: any) => void, reject: (err: Error) => void) => {
        this._transporter.sendMail(options, (error, info) => {
          if (error) {
            console.log(`error: ${error}`);
            reject(error);
          } else {
            console.log(`Message Sent ${info.response}`);
            resolve(`Message Sent ${info.response}`);
          }
        });
      }
    );
  }
}
