export interface IMailService {
  sendMail(
    to: string,
    subject: string,
    content: string,
    html: string
  ): Promise<void>;
}
