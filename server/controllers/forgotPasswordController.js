const { User } = require("../components/models");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const forgotPasswordController = async (req, res) => {
  const { email } = req.body;
  await User.findOne({ email }).then((user) => {
    if (!user) {
      return res.send({ Status: false, message: "User Not Found" });
    }
    const token = jwt.sign({ id: user._id }, "votesafe_secret_key", {
      expiresIn: "1d",
    });
    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "ntpatel2411@gmail.com",
        pass: "vijgtvihwvbhdtga",
      },
    });

    var mailOptions = {
      from: "ntpatel2411@gmail.com",
      to: `${email}`,
      subject: "Reset Your Password",
      text: `http://localhost:5173/resetpassword/${user._id}/${token}`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        return res.send({ Status: true, message: "Check Your Email" });
      }
    });
  });
};
module.exports = { forgotPasswordController };
