import nodemailer from 'nodemailer'

// const sendEmail = async (options) => {
//   // 1) create a transporter -

//   const transporter = nodemailer.createTransport({
//     // service: 'Gmail',
//     host: process.env.EMAIL_HOST,
//     port: process.env.EMAIL_PORT,
//     auth: {
//       user: process.env.EMAIL_USERNAME,
//       pass: process.env.EMAIL_PASSWORD,
//     },
//     // Activate in gmail 'less secure app' option.
//   })

//   // 2) DEFINE THE EMAIL OPTIONS

//   const mailOptions = {
//     from: 'dipak sarmah <csb20021@tezu.ac.in>',
//     to: options.email,
//     subject: options.subject,
//     text: options.message,
//     // html:
//   }

//   //   3)actually send the email

//   await transporter.sendMail(mailOptions)
// }

// export default sendEmail

// const transporter = nodemailer.createTransport({
//   // service: 'Gmail',
//   host: process.env.EMAIL_HOST,
//   port: process.env.EMAIL_PORT,
//   auth: {
//     user: process.env.EMAIL_USERNAME,
//     pass: process.env.EMAIL_PASSWORD,
//   },
//   // Activate in gmail 'less secure app' option.
// })

const transporter = nodemailer.createTransport({
  service: 'SendGrid',
  // host: process.env.EMAIL_HOST,
  // port: process.env.EMAIL_PORT,
  auth: {
    user: process.env.SENDGRID_USERNAME,
    pass: process.env.SENDGRID_PASSWORD,
  },
  // Activate in gmail 'less secure app' option.
})

export default transporter
