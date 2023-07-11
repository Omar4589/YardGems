const nodemailer = require("nodemailer");

// Configure Nodemailer
const transport = nodemailer.createTransport({
  service: "hotmail", // You can use other email services like Yahoo, Outlook, etc.
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendEmail = async (name, email, message) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER, // Replace this with the email you want to receive the message
      subject: "Review: Someone submitted the YardGems Contact Form!",
      text: `
          Name: ${name}
          Email: ${email}
          Message: ${message}
        `,
    };

    await transport.sendMail(mailOptions);
    console.log("Email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

module.exports = sendEmail;
