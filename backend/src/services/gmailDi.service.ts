import * as nodemailer from "nodemailer";
import {
  ISystemSettings,
  IISystemSettings
} from "../resources/interfaces/ISystemSettings.interface";
import { ServiceLocatorGeneric } from "./locator.service";
import { ConstructorInject } from "../resources/decorators/constructorInject.decorator";
import config from "../config/config";

@ConstructorInject
export class GMailServiceDi {
  private _transporter: nodemailer.Transporter;
  private _settings: ISystemSettings;
  config = config;

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

  constructor(_settings?: IISystemSettings, testParameter?: string) {
    this._transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: this.config.admin.email,
        pass: this.config.admin.password
      }
    });
  }
}

export interface IGMailServiceDi {
  sendMail(
    to: string,
    subject: string,
    content: string,
    html: string
  ): Promise<void>;
}

export class IIGMailServiceDi {}
