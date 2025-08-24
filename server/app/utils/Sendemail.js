// const nodemailer = require("nodemailer");
// const crypto = require("crypto");

// // Generate OTP
// const generateOtp = () => crypto.randomInt(100000, 999999).toString();

// // Send Email
// const sendEmail = async ({ to, name, otp,password }) => {
//   try {
//     const transporter = nodemailer.createTransport({
//       service: "gmail",
//       auth: {
//         user: process.env.my_email, // ✅ Correct key
//         pass: process.env.my_password,  // ✅ App password (not your real Gmail password)
//       },
//     });

//     await transporter.sendMail({
//       from: process.env.my_email,
//       to: to,
//       subject: "Your OTP Code",
//       text: `Hello ${name},\n\nYour OTP is: ${otp}\n\nIt is valid for 10 minutes.`,
//       html: `<p>Hello <b>${name}</b>,</p><p>Your OTP is: <b>${otp}</b></p><p> your password is <b>${password}</b><p>It is valid for 5 minutes.</p>`,
//     });

//     console.log("✅ Email sent successfully");
//   } catch (error) {
//     console.error("❌ Error sending email:", error);
//   }
// };

// module.exports = { sendEmail, generateOtp };
const generateOtp = () => crypto.randomInt(100000, 999999).toString()
const nodemailer = require('nodemailer')
const crypto = require('crypto')
const sendEmail = async ({ to, name, otp, password }) => {
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.my_email,
                pass: process.env.my_password
            }
        })
        await transporter.sendMail({
            from: process.env.my_email,
            to: to,
            subject: 'verification and credential',
            text: 'valid for 5 min',
            html: `<p>your credential is ${name} password:${password},otp:${otp}</p>`
        })
    } catch (error) {
        console.log(error);

    }

}
module.exports = { sendEmail, generateOtp }