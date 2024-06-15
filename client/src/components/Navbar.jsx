import React from "react";
import { useNavigate } from "react-router-dom";
import { AppBar, Box, Toolbar, Typography, Button, Link } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import Logo from "../assets/logo.png"; // Import your logo image file

export default function Vavbar() {
  const navigate = useNavigate();
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
            onClick={() => {
              navigate("/");
            }}
            alt="Logo"
            style={{ width: 40, marginRight: 10 }}
          />

          {/* Title */}
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, color: "#3873cb" }}
          >
            VoteSafe
          </Typography>

          {/* Navigation Buttons */}
          <Link
            to="/login"
            component={RouterLink}
            style={{ color: "#3873cb", textDecoration: "none" }}
          >
            <Button color="inherit" size="large">
              Get Started
            </Button>
          </Link>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
