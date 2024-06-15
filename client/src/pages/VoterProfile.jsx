import * as React from "react";
import { useState, useEffect } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Backdrop,
  CircularProgress,
  Skeleton,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { format } from "date-fns";
import DashboardNavbar from "../components/DashboardNavbar";
import Footer from "../components/Footer";
import { useNavigate, useParams } from "react-router-dom";
import "../styles/VoterProfile.css";
import axios from "axios";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function VoterProfile() {
  const { id } = useParams();
  const [elections, setElections] = useState([]);
  const [CurrRows, setCurrRows] = useState([]);
  const [UpRows, setUpRows] = useState([]);
  const [PreRows, setPreRows] = useState([]);
  const [Tabvalue, setTabValue] = React.useState(0);
  axios.defaults.withCredentials = true;
  const [loading, setLoading] = useState(true);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  useEffect(() => {
    const CurrTime = new Date();
    async function getVoter() {
      await axios
        .get(`http://localhost:3000/api/getVoter/${id}`)
        .then((res) => {
          if (!res.data.success) {
            alert(res.data.message);
            navigate("/login");
          } else {
            setVoter({
              ...voter,
              name: res.data.name,
              email: res.data.email,
              image: res.data.image,
            });
          }
        });
    }
    async function getElections() {
      await axios
        .get(`http://localhost:3000/api/getVoterElections/${id}`)
        .then((res) => {
          if (!res.data.success) {
            alert(res.data.message);
          } else {
            setLoading(false);
            setElections(res.data.elections);
            const currElections = res.data.elections.filter((election) => {
              const startTime = new Date(election.startTime);
              const endTime = new Date(election.endTime);
              return CurrTime > startTime && CurrTime < endTime;
            });

            setCurrRows(
              currElections.map((election) => ({
                id: election._id,
                electionTitle: election.title,
                startTime: election.startTime,
                endTime: election.endTime,
                candidate: election.candidate,
                voters: election.voter,
              }))
            );

            const upElections = res.data.elections.filter((election) => {
              const startTime = new Date(election.startTime);
              return CurrTime < startTime;
            });

            setUpRows(
              upElections.map((election) => ({
                id: election._id,
                electionTitle: election.title,
                startTime: election.startTime,
                endTime: election.endTime,
                candidate: election.candidate,
              }))
            );

            const prevElections = res.data.elections.filter((election) => {
              const endTime = new Date(election.endTime);
              return CurrTime > endTime;
            });

            setPreRows(
              prevElections.map((election) => ({
                id: election._id,
                electionTitle: election.title,
                startTime: election.startTime,
                endTime: election.endTime,
                candidate: election.candidate,
              }))
            );
          }
        });
    }
    getElections();
    getVoter();
  }, []);
  const isVoted = (election) => {
    for (let i = 0; i < election.voters.length; i++) {
      if (election.voters[i].email === voter.email) {
        return election.voters[i].voted;
      }
    }
    return false;
  };
  const navigate = useNavigate();
  const [selectedElection, setSelectedElection] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [voter, setVoter] = useState({
    name: "",
    email: "",
    image: "",
  });

  const handleDialogOpen = (election) => {
    setSelectedElection(election);
    setOpenDialog(true);
  };
  const handleVoteCasting = (election, callback) => {
    setSelectedElection(election, callback);
  };
  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const columns = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "electionTitle", headerName: "Election Title", width: 250 },
    {
      field: "startTime",
      headerName: "Start Date and Time (IST)",
      width: 250,
      valueFormatter: (params) => format(params.value, "dd/MM/yyyy - HH:mm"),
    },
    {
      field: "endTime",
      headerName: "End Date and Time (IST)",
      width: 250,
      valueFormatter: (params) => format(params.value, "dd/MM/yyyy - HH:mm"),
    },
    {
      field: "details",
      headerName: "Details",
      width: 250,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleDialogOpen(params.row)}
        >
          More Info
        </Button>
      ),
    },
    {
      field: "vote",
      headerName: "Cast Vote",
      width: 250,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            handleVoteCasting(params.row);
            navigate(`/voter/${id}/vote-casting/${params.row.id}`);
          }}
          disabled={isVoted(params.row)}
        >
          Vote
        </Button>
      ),
    },
  ];

  const upcolumns = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "electionTitle", headerName: "Election Title", width: 250 },
    {
      field: "startTime",
      headerName: "Start Date and Time (IST)",
      width: 250,
      valueFormatter: (params) => format(params.value, "dd/MM/yyyy - HH:mm"),
    },
    {
      field: "endTime",
      headerName: "End Date and Time (IST)",
      width: 250,
      valueFormatter: (params) => format(params.value, "dd/MM/yyyy - HH:mm"),
    },
    {
      field: "details",
      headerName: "Details",
      width: 250,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleDialogOpen(params.row)}
        >
          More Info
        </Button>
      ),
    },
  ];

  const precolumns = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "electionTitle", headerName: "Election Title", width: 250 },
    {
      field: "startTime",
      headerName: "Start Date and Time (IST)",
      width: 250,
      valueFormatter: (params) => format(params.value, "dd/MM/yyyy - HH:mm"),
    },
    {
      field: "endTime",
      headerName: "End Date and Time (IST)",
      width: 250,
      valueFormatter: (params) => format(params.value, "dd/MM/yyyy - HH:mm"),
    },
    {
      field: "details",
      headerName: "Details",
      width: 250,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleDialogOpen(params.row)}
        >
          More Info
        </Button>
      ),
    },
    {
      field: "result",
      headerName: "Results",
      width: 250,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            navigate("/" + id + "/result/" + params.row.id); //backend work
          }}
        >
          view
        </Button>
      ),
    },
  ];

  return (
    <div className="dashboard-container">
      <DashboardNavbar
        img={voter.image}
        name={voter.name}
        email={voter.email}
        currentDash={"Voter"}
        id={id}
      />
      <div className="main-content">
        <div className="user-profile">
          <h1 className="main-description">Voter Dashboard</h1>
          <p className="user-profile-info">Name:{voter.name}</p>
          <p className="user-profile-info">Email: {voter.email}</p>
        </div>

        <h2 className="sub-main-description">
          Here, you can view all the elections where you have the eligibility to
          vote.
        </h2>
      </div>

      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={Tabvalue}
            onChange={handleTabChange}
            aria-label="basic tabs example"
          >
            <Tab label="Current Elections" {...a11yProps(0)} />
            <Tab label="Upcoming Elections" {...a11yProps(1)} />
            <Tab label="Previous Elections" {...a11yProps(2)} />
          </Tabs>
        </Box>
        {loading ? (
          <>
            <Skeleton
              animation="wave"
              variant="rounded"
              width="95%"
              height={70}
              sx={{
                marginRight: "auto",
                marginLeft: "auto",
                marginTop: "20px",
                marginBottom: "20px",
              }}
            />
            <Skeleton
              animation="wave"
              variant="rounded"
              width="95%"
              height={70}
              sx={{
                marginRight: "auto",
                marginLeft: "auto",
                marginTop: "20px",
                marginBottom: "20px",
              }}
            />
            <Skeleton
              animation="wave"
              variant="rounded"
              width="95%"
              height={70}
              sx={{
                marginRight: "auto",
                marginLeft: "auto",
                marginTop: "20px",
                marginBottom: "20px",
              }}
            />
            <Skeleton
              animation="wave"
              variant="rounded"
              width="95%"
              height={70}
              sx={{
                marginRight: "auto",
                marginLeft: "auto",
                marginTop: "20px",
                marginBottom: "20px",
              }}
            />
            <Skeleton
              animation="wave"
              variant="rounded"
              width="95%"
              height={70}
              sx={{
                marginRight: "auto",
                marginLeft: "auto",
                marginTop: "20px",
                marginBottom: "20px",
              }}
            />
          </>
        ) : (
          <>
            <CustomTabPanel value={Tabvalue} index={0}>
              <div className="election-content">
                <div style={{ height: 500 }} className="dashboard-table">
                  <DataGrid
                    rows={CurrRows}
                    columns={columns}
                    initialState={{
                      pagination: {
                        paginationModel: { page: 0, pageSize: 10 },
                      },
                    }}
                    pageSizeOptions={[10, 15, 20]}
                    sx={{ backgroundColor: "lightcyan" }}
                    disableRowSelectionOnClick
                  />
                </div>
              </div>
            </CustomTabPanel>
            <CustomTabPanel value={Tabvalue} index={1}>
              <div className="election-content">
                <div style={{ height: 500 }} className="dashboard-table">
                  <DataGrid
                    rows={UpRows}
                    columns={upcolumns}
                    initialState={{
                      pagination: {
                        paginationModel: { page: 0, pageSize: 10 },
                      },
                    }}
                    pageSizeOptions={[10, 15, 20]}
                    sx={{ backgroundColor: "lightcyan" }}
                    disableRowSelectionOnClick
                  />
                </div>
              </div>
            </CustomTabPanel>
            <CustomTabPanel value={Tabvalue} index={2}>
              <div className="election-content">
                <div style={{ height: 500 }} className="dashboard-table">
                  <DataGrid
                    rows={PreRows}
                    columns={precolumns}
                    initialState={{
                      pagination: {
                        paginationModel: { page: 0, pageSize: 10 },
                      },
                    }}
                    pageSizeOptions={[10, 15, 20]}
                    sx={{ backgroundColor: "lightcyan" }}
                    disableRowSelectionOnClick
                  />
                </div>
              </div>
            </CustomTabPanel>
          </>
        )}
      </Box>

      {/* Dialog Box */}
      <Dialog
        open={openDialog}
        onClose={handleDialogClose}
        PaperProps={{
          style: {
            width: "350px",
            height: "350px",
            backgroundImage:
              "repeating-radial-gradient(circle, #f0fffe , lightcyan)",
            borderRadius: "5px",
            boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.75)",
            border: "1px solid #ccc",
            display: "flex",
          },
        }}
      >
        <DialogTitle>Election Details</DialogTitle>
        <DialogContent className="dialog-content">
          {selectedElection && (
            <div>
              <p className="election-details">
                <span className="detail-label">Election Title:</span>{" "}
                {selectedElection.electionTitle}
              </p>
              <p className="election-details">
                <span className="detail-label">Start Time:</span>{" "}
                {format(selectedElection.startTime, "dd/MM/yyyy - HH:mm")}
              </p>
              <p className="election-details">
                <span className="detail-label">End Time:</span>{" "}
                {format(selectedElection.endTime, "dd/MM/yyyy - HH:mm")}
              </p>
              <p className="detail-label">Candidates:</p>
              <ul className="candidate-list">
                {selectedElection.candidate.map((candidate) => (
                  <li key={candidate.email}>{candidate.email}</li>
                ))}
              </ul>
            </div>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>

      <div className="footer">
        <Footer />
      </div>
    </div>
  );
}
