const { User } = require("../components/models");
const updateCandidateController = async (req, res) => {
  const candidate = await User.findOne({ _id: req.params.id });

  const candidateDetails = {
    name: req.body.firstName + " " + req.body.lastName,
    password: candidate.password,
    email: candidate.email,
    image: candidate.image,
    gender: req.body.gender,
    dateOfBirth: req.body.dobString,
    dobDate: req.body.dateOfBirth,
    pincode: req.body.pincode,
    city: req.body.city,
    state: req.body.state,
  };
  if (
    await User.findOneAndUpdate({ _id: req.params.id }, candidateDetails).exec()
  ) {
    res.json({
      success: true,
      message: "Details Successfully updated for " + candidateDetails.name,
    });
  } else {
    res.json({ success: false, message: "Candidate not found" });
  }
};
module.exports = { updateCandidateController };
