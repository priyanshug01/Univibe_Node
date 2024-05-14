const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: "bloodrider945@gmail.com",
    pass: "Blood@945"
  }
}, {
  from: `Univibe Event <App>`
});

// const transporter = nodemailer.createTransport({
//     host: "smtp.office365.com",
//     secure: false, // true for 465, false for other ports
//     port: '587',
//     tls: {
//       ciphers:'SSLv3',
//       rejectUnauthorized: false 
//     },
//     auth: {
//       user: "lob1support@tmilltd.com",
//       pass: "Buxarah@156",
//     },
//   },
//   {
//     from: `TM International Logistics LTD`
//   }
// );

exports.sendMail = (fields) => transporter.sendMail(fields);