const { User } = require("../components/models");
const bcrypt = require("bcrypt");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");
function dataURItoBlob(dataURI) {
  var byteString = atob(dataURI.split(",")[1]);

  var mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];
  var ab = new ArrayBuffer(byteString.length);
  var dw = new DataView(ab);
  for (var i = 0; i < byteString.length; i++) {
    dw.setUint8(i, byteString.charCodeAt(i));
  }
  return new Blob([ab], { type: mimeString });
}
const registerController = async (req, res) => {
  const { firstname, lastname, email, password, profilePicture } = req.body;
  const user = await User.findOne({ email });
  let image = "";
  if (user) {
    return res.json({ message: "User already exists" });
  } else {
    if (profilePicture) {
      let filedata = dataURItoBlob(profilePicture);
      fs.writeFileSync(
        "profile.png",
        Buffer.from(await filedata.arrayBuffer())
      );
      const result = await cloudinary.uploader.upload("profile.png", {
        folder: "users",
      });
      image = result.url;
      fs.unlinkSync("profile.png");
    }
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    const name = firstname + " " + lastname;

    const gender = "";
    const dateOfBirth = null;
    const pincode = 0;
    const city = "";
    const state = "";
    const dobDate = null;
    const newUser = new User({
      name,
      email,
      password: hashPassword,
      image,
      gender,
      dateOfBirth,
      dobDate,
      pincode,
      city,
      state,
    });
    const user = await newUser.save();
    res.status(200).json({ message: "Registration Successful " + user.name });
  }
};
module.exports = { registerController };
