// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;
contract voteCasting {
    struct Candidate {
        string email;
        uint votes;
    }
    struct Voter{
        string email;
        bool voted;
    }
    Candidate [] candidates;
    Voter [] voters;
    string selectedCandidate;
    string voterVoting;
    function setStructs(Voter[] memory _voters, Candidate[] memory _candidates, string memory _selectedCandidate, string memory _voterVoting) public {
    for (uint i = 0; i < _voters.length; i++) {
        voters.push(Voter(_voters[i].email, _voters[i].voted));
    }
    for (uint i = 0; i < _candidates.length; i++) {
        candidates.push(Candidate(_candidates[i].email, _candidates[i].votes));
    }
    selectedCandidate = _selectedCandidate;
    voterVoting = _voterVoting;
}
      function doVoting() public {
        for (uint i = 0; i < candidates.length; i++) {
            if(keccak256(abi.encodePacked((candidates[i].email))) == keccak256(abi.encodePacked((selectedCandidate)))){
                candidates[i].votes += 1;
            }
        }
        for (uint i = 0; i < voters.length; i++) {
            if (keccak256(abi.encodePacked((voters[i].email))) == keccak256(abi.encodePacked((voterVoting)))) {
                voters[i].voted = true;    
            }
        }
    }
    function getVoter() public view returns (Voter[] memory){
        return voters;
    }
    function getCandidates() public view returns (Candidate[] memory){
        return candidates;
    }
    function remove() public {
        delete voters;
        delete candidates;
    }
}