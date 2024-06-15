import * as React from "react";
import { useState, useEffect } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  DialogContentText,
  Skeleton,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { format } from "date-fns";
import DashboardNavbar from "../components/DashboardNavbar";
import Footer from "../components/Footer";
import { useNavigate, useParams } from "react-router-dom";
import "../styles/VoterProfile.css";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileDateTimePicker } from "@mui/x-date-pickers/MobileDateTimePicker";
import dayjs from "dayjs";
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
export default function CreatorProfile() {
  const navigate = useNavigate();
  const { id } = useParams();
  axios.defaults.withCredentials = true;
  const [admin, setAdmin] = useState({
    name: "",
    email: "",
    image: "",
  });
  const [elections, setElections] = useState([]);
  const [CurrRows, setCurrRows] = useState([]);
  const [UpRows, setUpRows] = useState([]);
  const [PreRows, setPreRows] = useState([]);
  const [Tabvalue, setTabValue] = React.useState(0);
  const [isCandidateFileSubmitted, setIsCandidateFileSubmitted] =
    useState(false);
  const [isVoterFileSubmitted, setIsVoterFileSubmitted] = useState(false);
  const [loading, setLoading] = useState(true);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };
  useEffect(() => {
    const CurrTime = new Date();
    async function getAdmin() {
      await axios
        .get(`http://localhost:3000/api/getAdmin/${id}`)
        .then((res) => {
          if (!res.data.success) {
            alert(res.data.message);
            navigate("/login");
          } else {
            setAdmin({
              ...admin,
              name: res.data.name,
              email: res.data.email,
              image: res.data.image,
            });
          }
        });
    }
    async function getElections() {
      await axios
        .get(`http://localhost:3000/api/getAdminElections/${id}`)
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
    getAdmin();
    getElections();
  }, []);
  const [openCreate, setOpenCreate] = useState(false);
  const [electionDetails, setElectionDetails] = useState({
    title: "",
    startTime: null,
    endTime: null,
    candidateList: null,
    voterList: null,
  });

  const handleClickOpen = () => {
    setOpenCreate(true);
  };

  const handleClose = () => {
    setOpenCreate(false);
    setElectionDetails({
      title: "",
      startTime: null,
      endTime: null,
      candidateList: null,
      voterList: null,
    });
    setIsCandidateFileSubmitted(false);
    setIsVoterFileSubmitted(false);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setElectionDetails({ ...electionDetails, [name]: value });
  };

  const handleDateTimeChange = (name, date) => {
    setElectionDetails({ ...electionDetails, [name]: date });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Here you can handle the submission of electionDetails

    if (!electionDetails.startTime || !electionDetails.endTime) {
      alert("Please provide the election date and time.");
      return;
    }

    if (
      dayjs(electionDetails.startTime).isAfter(dayjs(electionDetails.endTime))
    ) {
      alert("Start time must be before end time.");
      return;
    }

    if (electionDetails.title.trim() === "") {
      alert("Please provide a title for the election.");
      return;
    }

    if (electionDetails.startTime > electionDetails.endTime) {
      alert("Start time must be before end time.");
      return;
    }

    if (electionDetails.endTime < new Date()) {
      alert("End time must be in the future.");
      return;
    }

    if (electionDetails.candidateList === null) {
      alert("Please provide candidate list");
      return;
    }
    if (electionDetails.voterList === null) {
      alert("Please provide voter list");
      return;
    }

    axios
      .post(`http://localhost:3000/api/createElection/${id}`, electionDetails)
      .then((res) => {
        if (res.data.success) {
          alert(res.data.title + " Election Created");
          setIsCandidateFileSubmitted(false);
          setIsVoterFileSubmitted(false);
          location.reload();
        } else if (!res.data.success) {
          alert("Election Creation Failed\n" + res.data.message);
        }
      });
    handleClose();
  };

  const [selectedElection, setSelectedElection] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  const handleDialogOpen = (election) => {
    setSelectedElection(election);
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const columns = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "electionTitle", headerName: "Election Title", width: 300 },
    {
      field: "startTime",
      headerName: "Start Date and Time (IST)",
      width: 300,
      valueFormatter: (params) => format(params.value, "dd/MM/yyyy - HH:mm"),
    },
    {
      field: "endTime",
      headerName: "End Date and Time (IST)",
      width: 300,
      valueFormatter: (params) => format(params.value, "dd/MM/yyyy - HH:mm"),
    },
    {
      field: "details",
      headerName: "Details",
      width: 300,
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

  const handleFileInputChange = (event, type, list) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = async (event) => {
        const csvData = event.target.result;
        // Split CSV data by lines
        const rows = csvData.split("\n");
        const parsedData = rows.map((row) => row.split(",")); // Assuming comma-separated values

        // Remove header row if it exists
        const header = parsedData.shift();

        // Create an array of objects using the header row as keys
        const dataObjects = parsedData.map((row) => {
          const obj = {};
          header.forEach((key, index) => {
            obj[key.trim()] = row[index].trim();
          });
          return obj;
        });

        // Store parsed data in the appropriate state variable
        if (list === "Candidate") {
          setElectionDetails({
            ...electionDetails,
            candidateList: dataObjects,
          });
          setIsCandidateFileSubmitted(true);
        } else if (list === "Voter") {
          setElectionDetails({ ...electionDetails, voterList: dataObjects });
          setIsVoterFileSubmitted(true);
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="dashboard-container">
      <DashboardNavbar
        img={admin.image}
        name={admin.name}
        email={admin.email}
        currentDash={"Admin"}
        id={id}
      />
      <div className="main-content">
        <div className="user-profile">
          <h1 className="main-description">Admin Dashboard</h1>
          <p className="user-profile-info">Name: {admin.name}</p>
          <p className="user-profile-info">Email: {admin.email}</p>
          <div className="create-election-button">
            <Button variant="contained" onClick={handleClickOpen}>
              Create new election
            </Button>
            <Dialog
              open={openCreate}
              onClose={handleClose}
              PaperProps={{
                style: {
                  width: "500px",
                  height: "auto",
                  backgroundImage:
                    "repeating-radial-gradient(circle, #f0fffe , lightcyan)",
                  borderRadius: "5px",
                  boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.75)",
                  border: "1px solid #ccc",
                  display: "flex",
                },
              }}
            >
              <form
                className="election-form"
                encType="multipart/form-data"
                onSubmit={handleSubmit}
              >
                <DialogTitle>New Election</DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    Please enter the details
                  </DialogContentText>
                  <TextField
                    autoFocus
                    required
                    margin="dense"
                    id="title"
                    name="title"
                    label="Election Title"
                    type="text"
                    fullWidth
                    variant="outlined"
                    value={electionDetails.title}
                    onChange={handleInputChange}
                    className="form-field"
                  />
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <div className="date-time-picker">
                      <MobileDateTimePicker
                        label="Start time"
                        value={electionDetails.startTime}
                        onChange={(date) =>
                          handleDateTimeChange("startTime", date)
                        }
                        className="form-field"
                        required
                      />
                      <MobileDateTimePicker
                        label="End time"
                        value={electionDetails.endTime}
                        onChange={(date) =>
                          handleDateTimeChange("endTime", date)
                        }
                        className="form-field"
                        required
                      />
                    </div>
                  </LocalizationProvider>

                  <div className="form-file form-field">
                    <div className="form-file-button">
                      <input
                        accept=".csv"
                        id="candidateList"
                        type="file"
                        onChange={(event) =>
                          handleFileInputChange(
                            event,
                            "candidateList",
                            "Candidate"
                          )
                        }
                        style={{ display: "none" }}
                      />
                      <label htmlFor="candidateList">
                        <Button
                          variant="outlined"
                          component="span"
                          className="form-file-button"
                        >
                          Upload Candidate List CSV
                        </Button>
                      </label>
                    </div>
                    {isCandidateFileSubmitted && (
                      <p className="file-upload-success">
                        Candidate list uploaded!
                      </p>
                    )}
                  </div>
                  {/* Voter list CSV file upload */}
                  <div className="form-file form-field">
                    <div className="form-file-button">
                      <input
                        accept=".csv"
                        id="voterList"
                        type="file"
                        onChange={(event) =>
                          handleFileInputChange(event, "voterList", "Voter")
                        }
                        style={{ display: "none" }}
                      />
                      <label htmlFor="voterList">
                        <Button
                          variant="outlined"
                          component="span"
                          className="form-file-button"
                        >
                          Upload Voter List CSV
                        </Button>
                      </label>
                    </div>
                    {isVoterFileSubmitted && (
                      <p className="file-upload-success">
                        Voter list uploaded!
                      </p>
                    )}
                  </div>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose} className="form-button">
                    Cancel
                  </Button>
                  <Button type="submit" className="form-button">
                    Submit
                  </Button>
                </DialogActions>
              </form>
            </Dialog>
          </div>
        </div>

        <h2 className="sub-main-description">
          Here, you can view all the elections created by you
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
