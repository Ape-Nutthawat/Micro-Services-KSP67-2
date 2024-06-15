import { pool } from '../database.js';
import nodemailer from 'nodemailer';
import { Template } from '../sendMail/Template.js';
import { TemplatePayment } from '../sendMail/TemplatePayment.js';
import { TemplateRefund } from '../sendMail/TemplateRefund.js';

export default class SendMailService {
  async sendMailRegister(receiver) {
    const smtp = {
      debug: false,
      requireTLS: true,
      host: 'onerelay.one.th', //set to your host name or ip
      secureConnection: false, // use SSL
      port: '25', //25, 465, 587 depend on your
      // secure: true, // use SSL
      auth: {
        user: 'online@inet.co.th',
        pass: '',
      },
      tls: {
        // ciphers: 'SSLv3',
        rejectUnauthorized: false,
      },
    };

    try {
      // console.log('ทดสอบส่งเมล');
      var transporter = nodemailer.createTransport(smtp);
      var mailOptions = {
        from: `online@inet.co.th`,
        to: receiver,
        subject: 'สำนักงานเลขาธิการคุรุสภาได้รับข้อมูลการกรอกใบสมัครสอบวิชาครูครั้งที่ 2/2567 ของท่านแล้ว',
        html: Template(),
      };

      // send mail with defined transport object
      const result = await transporter.sendMail(mailOptions);
      // console.log(" 😎 ~ //sendMail ~ result : ", result)
      return true;
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  async sendMailPayment(receiver) {
    const smtp = {
      debug: false,
      requireTLS: true,
      host: 'onerelay.one.th', //set to your host name or ip
      secureConnection: false, // use SSL
      port: '25', //25, 465, 587 depend on your
      // secure: true, // use SSL
      auth: {
        user: 'online@inet.co.th',
        pass: '',
      },
      tls: {
        // ciphers: 'SSLv3',
        rejectUnauthorized: false,
      },
    };

    try {
      // console.log('ทดสอบส่งเมล');
      for (let i = 0; i < receiver.length; i++) {
        var transporter = nodemailer.createTransport(smtp);
        var mailOptions = {
          from: `online@inet.co.th`,
          to: receiver[i],
          subject: 'สำนักงานเลขาธิการคุรุสภาได้รับข้อมูลยืนยันการชำระเงินค่าสมัครสอบวิชาครูครั้งที่ 2/2567 ของท่าน จากธนาคารแล้ว',
          html: TemplatePayment(),
        };
        // console.log(mailOptions.to);
        await transporter.sendMail(mailOptions);
      }

      // console.log(" 😎 ~ //sendMail ~ result : ", result)
      return true;
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  async sendMailRefund(receiver) {
    const smtp = {
      debug: false,
      requireTLS: true,
      host: 'onerelay.one.th', //set to your host name or ip
      secureConnection: false, // use SSL
      port: '25', //25, 465, 587 depend on your
      // secure: true, // use SSL
      auth: {
        user: 'online@inet.co.th',
        pass: '',
      },
      tls: {
        // ciphers: 'SSLv3',
        rejectUnauthorized: false,
      },
    };

    try {
      // console.log('ทดสอบส่งเมล');
      for (let i = 0; i < receiver.length; i++) {
        var transporter = nodemailer.createTransport(smtp);
        var mailOptions = {
          from: `online@inet.co.th`,
          to: receiver[i],
          subject: 'สำนักงานเลขาธิการคุรุสภากำลังดำเนินการข้อมูลของท่าน',
          html: TemplateRefund(),
        };
        // console.log(mailOptions.to);
        await transporter.sendMail(mailOptions);
      }

      // console.log(" 😎 ~ //sendMail ~ result : ", result)
      return true;
    } catch (err) {
      console.log(err);
      return err;
    }
  }
}
