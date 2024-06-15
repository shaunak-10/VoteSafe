import { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import "../styles/Login.css";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/logo.png";
import Footer from "../components/Footer";
import axios from "axios";
function EmailInput() {
  const [form, setForm] = useState({
    email: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { value, name } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await axios
      .post("http://localhost:3000/api/forgotPassword", form)
      .then((res) => {
        if (res.data.Status) {
          alert(res.data.message);
          navigate("/login");
        } else {
          alert(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
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
          <h1 className="form-title">Enter your registered Email.</h1>
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
              <Button
                variant="contained"
                type="submit"
                className="submit-button"
              >
                Send Reset Email
              </Button>
            </div>
          </form>
        </div>
        <p className="signup-link">
          Go back to <Link to="/login">Login</Link> page
        </p>
      </div>
      <Footer />
    </div>
  );
}

export default EmailInput;
