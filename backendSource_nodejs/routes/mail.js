const express = require('express');
const router = express.Router();

const nodemailer = require('nodemailer');

router.post('/send', (req, res) => {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'direpire3@gmail.com',
          pass: 'nimabu60'
        }
      });

      var mailOptions = {
        from: 'direpire3@gmail.com',
        to: 'mirzaikromovhamidullo72@gmail.com',
        subject: `Web saytingiz foydalanuvchisidan xabar!`,
        text: `Foydalanuvchi haqida malumot:
        Ism: ${req.body.name}
        Familya: ${req.body.surname}
        Email: ${req.body.email}
        Xabar: ${req.body.message}
        `,
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          return res.status(401).send(false);
        } else {
          return res.send('ok')
        }
      });
      
})

module.exports = router;