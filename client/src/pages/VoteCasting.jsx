import { useEffect, useState } from "react";
import {
  CardContent,
  Button,
  Typography,
  Avatar,
  Dialog,
  DialogContent,
  DialogActions,
  Backdrop,
  CircularProgress,
} from "@mui/material";
import "../styles/VoteCasting.css"; // Import the CSS file
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import InfoIcon from "@mui/icons-material/Info";
export default function ElectionDashboard() {
  const navigate = useNavigate();
  const { id, eid } = useParams();
  const [election, setElection] = useState({});
  const [candidates, setCandidates] = useState([]);
  const [progress, setProgress] = useState(0);
  const [curTime, setCurTime] = useState(0);
  const [endTime, setEndTime] = useState(0);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function getElection() {
      await axios
        .get(`http://localhost:3000/api/getElection/${eid}`)
        .then((res) => {
          setLoading(false);
          setElection(res.data.election);
          setCandidates(res.data.candidates);

          const startTime = new Date(res.data.election.startTime).getTime();
          const endTime = new Date(res.data.election.endTime).getTime();
          const currentTime = new Date().getTime();
          const totalDuration = endTime - startTime;
          const elapsed = currentTime - startTime;
          const progressPercentage = (elapsed / totalDuration) * 100;
          setProgress(progressPercentage);
          setCurTime(currentTime);
          setEndTime(endTime);
        });
    }
    getElection();
  });
  // State to track the voted option
  const [votedOption, setVotedOption] = useState(null);

  // Function to handle vote button click
  const handleVote = async (candidateId) => {
    setVotedOption(candidateId);
    await axios
      .post(`http://localhost:3000/api/vote/${id}/${eid}/${candidateId}`)
      .then((res) => {
        if (res.data.success) {
          alert(
            "Thank you for voting, you will be redirected to the dashboard"
          );
          navigate(`/voter/${id}`);
        }
      });
  };

  const handleDialogOpen = (candidate) => {
    setSelectedCandidate(candidate);
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  if (curTime > endTime) {
    navigate(`/${id}/result/${eid}`);
  } else if (loading) {
    return (
      <Backdrop
        sx={{ color: "lightcyan", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={true}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    );
  } else {
    return (
      <div className="ballot-main-content">
        <div className="progress-bar">
          <div className="progress-bar-container">
            <div
              className="progress-bar-fill"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <div className="progress-percentage">
            <h3>Progress - {progress.toFixed(3)}%</h3>
          </div>
        </div>

        <div className="ballot-main">
          <h1 className="main-description">{election.title}</h1>
          <div className="ballot-card">
            <CardContent>
              {candidates.map((candidate) => (
                <div className="candidate" key={candidate.email}>
                  <div className="candidate-info">
                    <Avatar
                      className="ballot-avatar"
                      src={candidate.photo}
                      sx={{ width: 100, height: 100 }}
                    ></Avatar>{" "}
                    {/* Avatar component */}
                    <Typography variant="h4" component="span">
                      {candidate.name}
                    </Typography>
                  </div>
                  <div className="vote-buttons">
                    <div className="vote-button">
                      <Button
                        variant="text"
                        color="primary"
                        sx={{ fontSize: "1.5rem", marginTop: "0.3rem" }}
                        onClick={() => handleDialogOpen(candidate)}
                      >
                        <InfoIcon sx={{ fontSize: "2rem" }} />
                      </Button>
                    </div>
                    <div className="vote-button">
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleVote(candidate.id)}
                        sx={{ fontSize: "1.2rem" }} // Adjust font size
                      >
                        Vote
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </div>
        </div>

        <Dialog
          open={openDialog}
          onClose={handleDialogClose}
          PaperProps={{
            style: {
              width: "500px",
              height: "549px",
              backgroundImage:
                "repeating-radial-gradient(circle, #f0fffe , lightcyan)",
              borderRadius: "5px",
              boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.75)",
              border: "1px solid #ccc",
              display: "flex",
            },
          }}
        >
          <DialogContent>
            {selectedCandidate && (
              <div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Typography variant="h3">{selectedCandidate.name}</Typography>
                  <div style={{ marginBottom: "20px", marginTop: "20px" }}>
                    <Avatar
                      src={selectedCandidate.photo} // Candidate profile picture
                      alt={selectedCandidate.name} // Alt text for accessibility
                      style={{ width: "150px", height: "150px" }} // Adjust size
                    />
                  </div>
                </div>

                <Typography variant="h5" sx={{ marginBottom: "20px" }}>
                  <strong>Gender:</strong> {selectedCandidate.gender}
                </Typography>
                <Typography variant="h5" sx={{ marginBottom: "20px" }}>
                  <strong>Date of Birth:</strong>{" "}
                  {selectedCandidate.dateOfBirth}
                </Typography>
                <Typography variant="h5" sx={{ marginBottom: "20px" }}>
                  <strong>City:</strong> {selectedCandidate.city}
                </Typography>
                <Typography variant="h5" sx={{ marginBottom: "20px" }}>
                  <strong>State:</strong> {selectedCandidate.state}
                </Typography>
                <Typography variant="h5" sx={{ marginBottom: "20px" }}>
                  <strong>Pincode:</strong> {selectedCandidate.pincode}
                </Typography>
              </div>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDialogClose} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
