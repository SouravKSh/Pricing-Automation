const FormData = require("form-data");
const Mailgun = require("mailgun.js");
require("dotenv").config();
async function sendSimpleMessage() {
  const mailgun = new Mailgun(FormData);
  const mg = mailgun.client({
    username: "api",
    key: process.env.API_KEY || "API_KEY",
  });
  try {
    const data = await mg.messages.create(
      "sandbox78984c0b1d774a278d08c13d02263bd3.mailgun.org",
      {
        from: "Mailgun Sandbox <postmaster@sandbox78984c0b1d774a278d08c13d02263bd3.mailgun.org>",
        to: ["Sourav Kumar Sharma <ssouravkumar25@gmail.com>"],
        subject: "Pricing Validation Notification",
        text: "Congratulations, price validation has been completed",
      }
    );

    console.log(data); // logs response data
  } catch (error) {
    console.log(error); //logs any error
  }
}
module.exports = { sendSimpleMessage };
