const nodemailer = require("nodemailer");

// create reusable transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: "barberiaproyectofinal@gmail.com", // generated ethereal user
    pass: "dpdgwgeitzfoziyh", // generated ethereal password
  },
});

// transporter.verify().then(() => {
//   console.log("READY FOR SEND EMAILS");
// });

module.exports = {
  transporter,
};
