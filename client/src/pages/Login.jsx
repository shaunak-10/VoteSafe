import { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import "../styles/Login.css";
import { Link, useNavigate } from "react-router-dom";
import RadioGroup from "@mui/material/RadioGroup";
import Radio from "@mui/material/Radio";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import Logo from "../assets/logo.png";
import Footer from "../components/Footer";
import axios from "axios";

function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
    userType: "",
  });
  axios.defaults.withCredentials = true;
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { value, name } = e.target;
    setForm({
      ...form,
      [name]: value,
    });

    // Validate email format
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    await axios
      .post("http://localhost:3000/api/login", form, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        if (response.data.success === false) {
          alert(response.data.message);
        } else {
          if (form.userType === "voter") {
            navigate(`/voter/${response.data.id}`);
          } else if (form.userType === "candidate") {
            navigate(`/candidate/${response.data.id}`);
          } else if (form.userType === "creator") {
            navigate(`/creator/${response.data.id}`);
          }
        }
      });
  };

  const handleForgotPasswordClick = () => {
    alert("Please enter a valid email address");
  };

  return (
    <div className="login-background">
      <div className="login-wrapper">
        <div className="page-title">
          <h1>Enter the world of secure Voting</h1>
        </div>
        <div className="login-container">
          <div className="logo-container">
            <img src={Logo} alt="Logo" style={{ width: 70 }} />
          </div>
          <h1 className="form-title">Welcome back</h1>
          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <TextField
                id="email"
                label="Email"
                name="email"
                variant="outlined"
                type="email"
                onChange={handleChange}
                className="form-input"
                required
              />
            </div>
            <div className="form-group">
              <TextField
                id="password"
                label="Password"
                variant="outlined"
                name="password"
                type="password"
                onChange={handleChange}
                className="form-input"
                required
              />
            </div>
            <p className="forgot-password-link">
              <Link to="/email-input">Forgot Password?</Link>
            </p>
            <div className="form-group radio-group">
              <FormLabel
                id="demo-row-radio-buttons-group-label"
                className="radio-label"
              >
                Login as:
              </FormLabel>
              <RadioGroup
                row
                name="userType"
                className="radio-options"
                value={form.userType}
                onChange={handleChange}
              >
                <FormControlLabel
                  value="voter"
                  control={<Radio />}
                  label="Voter"
                  className="radio-option"
                  required
                />
                <FormControlLabel
                  value="candidate"
                  control={<Radio />}
                  label="Candidate"
                  className="radio-option"
                />
                <FormControlLabel
                  value="creator"
                  control={<Radio />}
                  label="Election Admin"
                  className="radio-option"
                />
              </RadioGroup>
            </div>

            <div className="form-group">
              <Button
                variant="contained"
                type="submit"
                className="submit-button"
              >
                Login
              </Button>
            </div>
          </form>
        </div>
        <p className="signup-link">
          First time on VoteSafe? <Link to="/signup">SignUp</Link>
        </p>
      </div>
      <Footer />
    </div>
  );
}

export default Login;
