const { mongoose } = require("./db");
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  image: String,
  gender: String,
  dateOfBirth: String,
  dobDate: Date,
  pincode: Number,
  city: String,
  state: String,
});
const electionSchema = new mongoose.Schema({
  title: String,
  admin: String,
  status: Boolean,
  startTime: Date,
  voter: {
    type: Array,
  },
  candidate: {
    type: Array,
  },
  endTime: Date,
  mailsent: Boolean,
});
const User = mongoose.model("user", userSchema);
const Election = mongoose.model("election", electionSchema);
module.exports = { User, Election };
