import React from "react";
import {
  Typography,
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Avatar,
} from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

import "../styles/Result.css";
import { PieChart } from "@mui/x-charts/PieChart";
import DashboardNavbar from "../components/DashboardNavbar";
import { useState, useEffect } from "react";
import Footer from "../components/Footer";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
export default function Result() {
  const navigate = useNavigate();
  const { id, vid } = useParams();
  const [candidates, setCandidate] = useState(null);
  const [user, setUser] = useState(null);
  useEffect(() => {
    getVoter();
    getCandidates();
  }, [id, vid]);
  async function getVoter() {
    await axios.get(`http://localhost:3000/api/getUser/${vid}`).then((res) => {
      if (!res.data.success) {
        alert(res.data.message);
        navigate("/login");
      } else {
        setUser({
          ...user,
          name: res.data.name,
          email: res.data.email,
          image: res.data.image,
          id: vid,
        });
      }
    });
  }
  async function getCandidates() {
    await axios.get(`http://localhost:3000/api/result/${id}`).then((res) => {
      if (!res.data.success) {
        alert(res.data.message);
        navigate("/login");
      } else {
        setCandidate(res.data.candidates);
      }
    });
  }

  if (!candidates || !user) {
    return (
      <Backdrop
        sx={{ color: "lightcyan", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={true}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    );
  } else {
    console.log(candidates);
    const winner = candidates.reduce((prev, current) =>
      prev.votes > current.votes ? prev : current
    );
    return (
      <>
        <DashboardNavbar
          img={user.image}
          name={user.name}
          email={user.email}
          id={user.id}
        />
        <div className="result-main-content">
          <h1 className="main-description" style={{ textAlign: "center" }}>
            {candidates[0].title} Results
          </h1>
          <div className="result-wrapper">
            <div className="result-table">
              <h2 className="main-description">
                Winner: {winner.name} ({winner.votes} votes)
              </h2>
              <TableContainer style={{ maxHeight: "500px", overflowY: "auto" }}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>
                        <Typography variant="h6">Image</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="h6">Name</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="h6">Votes</Typography>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {candidates.map((candidate) => (
                      <TableRow key={candidate.id}>
                        <TableCell>
                          <Avatar
                            src={candidate.image}
                            sx={{ width: 100, height: 100 }}
                          ></Avatar>
                        </TableCell>
                        <TableCell>
                          <Typography
                            variant="body1"
                            style={{ fontSize: "1.2rem" }}
                          >
                            {candidate.name}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography
                            variant="body1"
                            style={{ fontSize: "1.2rem" }}
                          >
                            {candidate.votes}
                          </Typography>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
            <div className="winner-info">
              <h2 className="main-description" style={{ textAlign: "center" }}>
                Winner Details
              </h2>
              <div className="winner-details">
                <div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <Typography variant="h3">{winner.name}</Typography>
                    <div style={{ marginBottom: "20px", marginTop: "20px" }}>
                      <Avatar
                        src={winner.image} // Candidate profile picture
                        // Alt text for accessibility
                        style={{ width: "150px", height: "150px" }} // Adjust size
                      />
                    </div>
                  </div>

                  <Typography variant="h5" sx={{ marginBottom: "20px" }}>
                    <strong>Gender:</strong> {winner.gender}
                  </Typography>
                  <Typography variant="h5" sx={{ marginBottom: "20px" }}>
                    <strong>Date of Birth:</strong> {winner.dateOfBirth}
                  </Typography>
                  <Typography variant="h5" sx={{ marginBottom: "20px" }}>
                    <strong>City:</strong> {winner.city}
                  </Typography>
                  <Typography variant="h5" sx={{ marginBottom: "20px" }}>
                    <strong>State:</strong> {winner.state}
                  </Typography>
                  <Typography variant="h5" sx={{ marginBottom: "20px" }}>
                    <strong>Pincode:</strong> {winner.pincode}
                  </Typography>
                </div>
              </div>
            </div>
          </div>

          <div className="piechart">
            <div className="chart-container">
              <div style={{ textAlign: "center" }}>
                <h1 className="main-description">Election analysis</h1>
                <PieChart
                  series={[
                    {
                      data: candidates.map((candidate) => ({
                        id: candidate.id.toString(),
                        value: candidate.votes,
                        label: candidate.name,
                      })),
                    },
                  ]}
                  width={500}
                  height={250}
                />
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }
}
