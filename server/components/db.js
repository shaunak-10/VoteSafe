const mongoose = require("mongoose");
const uri =
  "mongodb+srv://nisarg2411:nisarg2411@knowhow.p4qcwv3.mongodb.net/users?retryWrites=true&w=majority";
console.log("Connecting to MongoDB");

const con = mongoose
  .connect(uri)
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((error) => console.log(error));

module.exports = { mongoose };
