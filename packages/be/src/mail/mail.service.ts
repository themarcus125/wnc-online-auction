import { tag } from '@/utils/html';
import * as mailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';
import { mailConfig } from '~/config';

const { host, service, port, address, pass } = mailConfig;
const transporter = mailer.createTransport({
  host,
  service,
  port,
  auth: {
    user: address,
    pass,
  },
  tls: {
    ciphers: 'SSLv3',
  },
});

export const sendMail = (to: string[], subject: string, html: string) => {
  const options: Mail.Options = {
    from: `"Biddly Team" <${address}>`,
    to,
    subject,
    html,
  };
  return transporter.sendMail(options);
};

export const test = async (to: string) => {
  return sendMail(
    [to],
    'This is a test email',
    tag('h2', 'We are Biddly Support Team'),
  );
};
