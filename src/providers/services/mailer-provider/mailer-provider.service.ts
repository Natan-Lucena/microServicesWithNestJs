import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import 'dotenv/config';

interface ISendEmailDTO {
  to: string;
  subject: string;
  body: string;
}

@Injectable()
export class MailerProviderService {
  async sendEmail(dto: ISendEmailDTO) {
    const user = process.env.MAILER_USER;
    const pass = process.env.MAILER_PASS;

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user,
        pass,
      },
    });

    await transporter.sendMail({
      from: user,
      to: dto.to,
      subject: dto.subject,
      text: dto.body,
    });
  }
}
