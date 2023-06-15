import nodemailer from 'nodemailer';

// Link: https://myaccount.google.com/lesssecureapps
export class UtilsSendMail {
  public static async send(email: string, secret: number) {
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.SEND_EMAIL,
        pass: process.env.SEND_EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.SEND_MAIL,
      to: email,
      subject: '[Segurança] Resete sua senha',
      text: `Código de segurança: ${secret}`,
    };

    await transporter.sendMail(mailOptions);
  }
}
