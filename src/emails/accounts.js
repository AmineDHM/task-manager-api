const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "hotmail",
  auth: {
    user: "aminedh_dev@outlook.com",
    pass: "amine@10",
  },
});

const welcomeMail = async (to, name) => {
  var message = {
    from: "Task-Manger-App Team aminedh_dev@outlook.com",
    to,
    subject: "Welcome to the APP !",
    text: `Welcome to the app ${name}, thanks for joining !`,
  };
  try {
    await transporter.sendMail(message);
  } catch (e) {
    console.log(e);
  }
};

const cancelMail = async (to, name) => {
  var message = {
    from: "Task-Manger-App Team <aminedh_dev@outlook.com>",
    to,
    subject: "Sorry to see go !",
    text: `Hello ${name}, your account is successfully delete but before you go can you tell us why you are leaving us !
    Best regarads, The task-manger app team`,
  };
  try {
    await transporter.sendMail(message);
  } catch (e) {
    console.log(e);
  }
};

module.exports = {
  welcomeMail,
  cancelMail,
};
