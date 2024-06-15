const { User } = require("../components/models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const verifyToken = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.json({ success: false, message: "Token not found" });
  } else {
    jwt.verify(token, "secret", (err, user) => {
      if (err) {
        return res.json({ success: false, message: "Invalid Token" });
      } else {
        next();
      }
    });
  }
};
const loginController = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.json({ success: false, message: "User not found" });
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.json({ success: false, message: "Wrong Password" });
  }
  const token = jwt.sign({ id: user._id }, "secret", { expiresIn: "1d" });
  res.cookie("token", token);
  res.json({
    success: true,
    id: user._id,
  });
};
const voterController = async (req, res) => {
  const user1 = await User.findOne({ _id: req.params.id });
  res.json({
    success: true,
    email: user1.email,
    name: user1.name,
    image: user1.image,
  });
};
const candidateController = async (req, res) => {
  const user1 = await User.findOne({ _id: req.params.id });
  res.json({
    success: true,
    email: user1.email,
    name: user1.name,
    image: user1.image,
    gender: user1.gender,
    dateOfBirth: user1.dateOfBirth,
    city: user1.city,
    state: user1.state,
    pincode: user1.pincode,
    dobDate: user1.dobDate,
    id: user1._id,
  });
};
const adminController = async (req, res) => {
  const user1 = await User.findOne({ _id: req.params.id });
  res.json({
    success: true,
    email: user1.email,
    name: user1.name,
    image: user1.image,
  });
};
module.exports = {
  loginController,
  verifyToken,
  voterController,
  candidateController,
  adminController,
};
