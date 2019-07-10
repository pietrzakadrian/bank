import * as fs from 'fs';
import * as path from 'path';
import * as winston from 'winston';

import app from '../../config/config';

const { level, dir: logDir } = app.logging;

export class Logger {

  public static DEFAULT_SCOPE = 'app';

  private static parsePathToScope(filepath: string): string {
    if (filepath.indexOf(path.sep) >= 0) {
      filepath = filepath.replace(process.cwd(), '');
      filepath = filepath.replace(`${path.sep}src${path.sep}`, '');
      filepath = filepath.replace(`${path.sep}dist${path.sep}`, '');
      filepath = filepath.replace('.ts', '');
      filepath = filepath.replace('.js', '');
      filepath = filepath.replace(path.sep, ':');
    }
    return filepath;
  }

  private scope: string;
  private logger: winston.Logger;
  private transports: any[];

  constructor(scope?: string) {
    this.scope = Logger.parsePathToScope((scope) ? scope : Logger.DEFAULT_SCOPE);

    if (!fs.existsSync(logDir)) {
      fs.mkdirSync(logDir);
    }

    const currentDate = new Date().toJSON().slice(0, 10).replace(/-/g, '-');

    this.transports = [];
    this.transports.push(
      new winston.transports.File({ filename: `${logDir}/${level}-${currentDate}.log`, level: level }),
    );

    const myFormat = winston.format.printf(info => {
      return `${info.timestamp} ${info.level}: ${info.message}`;
    });
    if (app.environment !== 'test') {
      this.transports.push(new winston.transports.Console({
        format: winston.format.combine(
          winston.format.timestamp(),
          winston.format.colorize({ all: true }),
          myFormat
        )
      }));
    }

    const transports = this.transports;
    this.logger = winston.createLogger({
      format: winston.format.combine(
        winston.format.timestamp({
          format: 'YYYY-MM-DD HH:mm:ss'
        }),
        myFormat
      ),
      transports
    });
  }

  public debug(message: string, ...args: any[]): void {
    this.log('debug', message, args);
  }

  public info(message: string, ...args: any[]): void {
    this.log('info', message, args);
  }

  public warn(message: string, ...args: any[]): void {
    this.log('warn', message, args);
  }

  public error(message: string, ...args: any[]): void {
    this.log('error', message, args);
  }

  private log(level: string, message: string, args: any[]): void {
    let formattedMsg = `${this.formatScope()} ${message}`;
    if (args && args.length > 0) {
      formattedMsg = formattedMsg + JSON.stringify(args);
    }
    this.logger.log(level, formattedMsg);
  }

  private formatScope(): string {
    return `[${this.scope}]`;
  }

}
