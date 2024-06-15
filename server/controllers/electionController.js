const { Election } = require("../components/models");
const { User } = require("../components/models");
const electionCreateController = async (req, res) => {
  const { title, startTime, endTime, voterList, candidateList } = req.body;
  const user1 = await User.findOne({ _id: req.params.id });
  const admin = user1.email;
  var notExistsCandidates = "";
  var notExistsVoters = "";
  let isError = false;
  for (let voters of voterList) {
    if (!(await User.findOne({ email: voters.voters }))) {
      isError = true;
      notExistsVoters = notExistsVoters.concat(voters.voters + "\n");
    }
  }
  for (let candidates of candidateList) {
    if (!(await User.findOne({ email: candidates.candidates }))) {
      isError = true;
      notExistsCandidates = notExistsCandidates.concat(
        candidates.candidates + "\n"
      );
    }
  }
  if (isError) {
    return res.json({
      success: false,
      message:
        notExistsVoters +
        ":Voter does not exist\n" +
        notExistsCandidates +
        ":Candidate does not exist",
    });
  }
  const voter = [];
  voter.push(
    ...voterList.map((voter) => ({
      email: voter.voters,
      voted: false,
    }))
  );
  const candidate = [];
  candidate.push(
    ...candidateList.map((candidate) => ({
      email: candidate.candidates,
      votes: 0,
    }))
  );
  const mailsent = false;
  const newElection = new Election({
    title,
    admin,
    voter,
    candidate,
    startTime,
    endTime,
    mailsent,
  });
  const data = await newElection.save();
  res.json({ success: true, title: data.title });
};
const getAdminElections = async (req, res) => {
  const user1 = await User.findOne({ _id: req.params.id });
  const admin = user1.email;
  const elections = await Election.find({ admin });
  for (let election of elections) {
    for (candidate of election.candidate) {
      let user = await User.findOne({ email: candidate.email });
      candidate.email = user.name;
    }
  }
  res.json({ success: true, elections });
};
const getVoterElections = async (req, res) => {
  const user1 = await User.findOne({ _id: req.params.id });
  const voteremail = user1.email;
  const elections = await Election.find({ "voter.email": voteremail });
  for (let election of elections) {
    for (candidate of election.candidate) {
      let user = await User.findOne({ email: candidate.email });
      candidate.email = user.name;
    }
  }
  res.json({ success: true, elections });
};
const getCandidateElections = async (req, res) => {
  const user1 = await User.findOne({ _id: req.params.id });
  const candidateemail = user1.email;
  const elections = await Election.find({ "candidate.email": candidateemail });
  for (let i = 0; i < elections.length; i++) {
    for (let j = 0; j < elections[i].candidate.length; j++) {
      let user = await User.findOne({ email: elections[i].candidate[j].email });
      elections[i].candidate[j].name = user.name;
    }
  }
  for (let election of elections) {
    for (candidate of election.candidate) {
      let user = await User.findOne({ email: candidate.email });
      candidate.email = user.name;
    }
  }
  res.json({ success: true, elections });
};

const getElection = async (req, res) => {
  const election = await Election.findOne({ _id: req.params.eid });
  let candidates = [];
  for (let i = 0; i < election.candidate.length; i++) {
    const user = await User.findOne({ email: election.candidate[i].email });
    const candidate = {
      name: user.name,
      photo: user.image,
      email: user.email,
      gender: user.gender,
      dateOfBirth: user.dateOfBirth,
      city: user.city,
      state: user.state,
      pincode: user.pincode,
      dobDate: user.dobDate,
      id: user._id,
    };
    candidates.push(candidate);
  }
  res.json({ success: true, election, candidates });
};
module.exports = {
  electionCreateController,
  getAdminElections,
  getVoterElections,
  getCandidateElections,
  getElection,
};
