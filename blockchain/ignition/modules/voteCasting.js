const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("voteCastingModule", (m) => {
  const votingContract = m.contract("voteCasting");

  return { votingContract };
});
