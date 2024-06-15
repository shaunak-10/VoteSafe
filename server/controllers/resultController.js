const { Election } = require("../components/models");
const { User } = require("../components/models");
const getResults = async (req, res) => {
  const election = await Election.findOne({ _id: req.params.id });
  let candidates = [];
  for (let i = 0; i < election.candidate.length; i++) {
    const user = await User.findOne({ email: election.candidate[i].email });
    const candidate = {
      name: user.name,
      title:election.title,
      image: user.image,
      votes: election.candidate[i].votes,
      id: user._id,
      gender: user.gender,
      dateOfBirth: user.dateOfBirth,
      city: user.city,
      state: user.state,
      pincode: user.pincode,
    };
    candidates.push(candidate);
  }
  res.json({ success: true, election, candidates });
};
const getUser = async (req, res) => {
  const user1 = await User.findOne({ _id: req.params.id });
  res.json({
    success: true,
    email: user1.email,
    name: user1.name,
    image: user1.image,
  });
};
module.exports = { getResults, getUser };
