const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const mongoose = require("./components/db");
const cookieParser = require("cookie-parser");
const { Election } = require("./components/models");
const { sendMail } = require("./controllers/notificationController");
var bodyparser = require("body-parser");
app.use(bodyparser.json({ limit: "50mb" }));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
const checkmail = async (req, res) => {
  const data = await Election.find({});
  data.forEach((element) => {
    if (element.mailsent == false && new Date() > new Date(element.endTime)) {
      element.voter.forEach((element2) => {
        sendMail(element.title, element2.email);
      });
      element.mailsent = true;
    }
    Election.findOneAndUpdate({ _id: element._id }, element).exec();
  });
};

setInterval(checkmail, 10000);
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api/", require("./router/loginRouter"));
app.use("/api/", require("./router/registerRouter"));
app.use("/api/", require("./router/forgotPasswordRouter"));
app.use("/api/", require("./router/resetPasswordRouter"));
app.use("/api/", require("./router/ElectionRouter"));
app.use("/api/", require("./router/voteCastingRouter"));
app.use("/api/", require("./router/candidateRouter"));
app.use("/api/", require("./router/resultRouter"));
app.listen(3000, () => {
  console.log(`Server is running on http://localhost:${3000}`);
});
