import React from "react";
import { useState } from "react";
import { AppBar, Box, Toolbar, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/logo.png"; // Import your logo image file
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Logout from "@mui/icons-material/Logout";
import HowToVoteIcon from "@mui/icons-material/HowToVote";
import GroupsIcon from "@mui/icons-material/Groups";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";

export default function DashboardNavbar({ img, name, email, currentDash, id }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const destroySession = () => {
    navigate("/");
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="fixed"
        sx={{ backgroundColor: "lightcyan", boxShadow: "none" }}
      >
        <Toolbar>
          {/* Logo */}
          <img
            src={Logo}
            onClick={() => navigate("/")}
            alt="Logo"
            style={{ width: 40, marginRight: 10 }}
          />

          {/* Title */}
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, color: "#3873cb" }}
            onClick={() => navigate("/")}
          >
            VoteSafe
          </Typography>

          {/* Navigation Buttons */}
          <React.Fragment>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                textAlign: "center",
              }}
            >
              <IconButton
                onClick={handleClick}
                size="small"
                sx={{ ml: 2 }}
                aria-controls={open ? "account-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
              >
                <Avatar src={img} sx={{ width: 40, height: 40 }}></Avatar>
              </IconButton>
            </Box>
            <Menu
              anchorEl={anchorEl}
              id="account-menu"
              open={open}
              onClose={handleClose}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
              PaperProps={{
                style: {
                  width: "300px",
                  height: "auto",
                  backgroundImage:
                    "repeating-radial-gradient(circle, #f0fffe , lightcyan)",
                  borderRadius: "5px",
                  boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.75)",
                  border: "1px solid #ccc",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                },
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <MenuItem sx={{ p: 2 }}>{email}</MenuItem>
              </div>

              <MenuItem sx={{ p: 2 }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%",
                  }}
                >
                  <Avatar src={img} sx={{ width: 100, height: 100 }} />
                </div>
              </MenuItem>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <MenuItem sx={{ p: 2 }}>Hi, {name}!</MenuItem>
              </div>

              <Divider />

              {currentDash !== "Voter" && (
                <MenuItem onClick={() => navigate(`/voter/${id}`)}>
                  <HowToVoteIcon
                    style={{ marginRight: "12px" }}
                    color="action"
                  />{" "}
                  Voter Dashboard
                </MenuItem>
              )}
              {currentDash !== "Candidate" && (
                <MenuItem onClick={() => navigate(`/candidate/${id}`)}>
                  <GroupsIcon style={{ marginRight: "12px" }} color="action" />{" "}
                  Candidate Dashboard
                </MenuItem>
              )}
              {currentDash !== "Admin" && (
                <MenuItem onClick={() => navigate(`/creator/${id}`)}>
                  <AdminPanelSettingsIcon
                    style={{ marginRight: "12px" }}
                    color="action"
                  />{" "}
                  Admin Dashboard
                </MenuItem>
              )}

              <MenuItem onClick={destroySession}>
                <ListItemIcon>
                  <Logout fontSize="small" />
                </ListItemIcon>
                Logout
              </MenuItem>
            </Menu>
          </React.Fragment>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
