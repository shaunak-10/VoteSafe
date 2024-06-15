const { User } = require("../components/models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const resetPasswordController = async (req, res) => {
  const { id, token } = req.params;
  const { newPassword, reNewPassword } = req.body;
  jwt.verify(token, "votesafe_secret_key", async (err, user) => {
    if (err) {
      return res.json({ success: false, message: "Invalid Link" });
    } else {
      const user = await User.findOne({ _id: id });
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(newPassword, salt);
      user.password = hashPassword;
      await user
        .save()
        .then(() => {
          return res.json({
            success: true,
            message: "Password Reset Successful",
          });
        })
        .catch((err) => {
          return res.json({ success: false, message: "Something went wrong" });
        });
    }
  });
};

module.exports = { resetPasswordController };
