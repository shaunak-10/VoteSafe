import { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import LoadingButton from "@mui/lab/LoadingButton";
import "../styles/Login.css";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/logo.png";
import Footer from "../components/Footer";
import axios from "axios";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

function Signup() {
  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    repassword: "",
    profilePicture: null,
  });
  const navigate = useNavigate();
  const [isUploaded, setIsUploaded] = useState(false);
  const [registered, setRegistered] = useState(true);
  const handleChange = (e) => {
    const { value, name } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };
  const sendform = async () => {
    if (isUploaded) {
      setRegistered(false);
      await axios
        .post("http://localhost:3000/api/register", form, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          setRegistered(true);
          alert(response.data.message);
          navigate("/login");
        });
    } else {
      alert("Please upload a profile picture");
    }
  };
  const handleSubmit = (event) => {
    event.preventDefault();

    if (form.password !== form.repassword) {
      alert("Passwords do not match");
    } else {
      sendform();
    }
  };
  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
    });
  const handleProfilePictureChange = async (e) => {
    setForm({
      ...form,
      profilePicture: await toBase64(e.target.files[0]), // Update profile picture state
    });
    setIsUploaded(true);
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
          <h1 className="form-title">Create your account</h1>
          <form
            encType="multipart/form-data"
            onSubmit={handleSubmit}
            className="login-form"
          >
            <div className="form-group">
              <TextField
                name="firstname"
                id="firstname"
                label="First Name"
                variant="outlined"
                type="text"
                onChange={handleChange}
                className="form-input"
                required
              />
            </div>
            <div className="form-group">
              <TextField
                name="lastname"
                id="lastname"
                label="Last Name"
                variant="outlined"
                type="text"
                onChange={handleChange}
                className="form-input"
                required
              />
            </div>
            <div className="form-group">
              <TextField
                name="email"
                id="email"
                label="Email"
                variant="outlined"
                type="email"
                onChange={handleChange}
                className="form-input"
                required
              />
            </div>
            <div className="form-group">
              <TextField
                name="password"
                id="password"
                label="Password"
                variant="outlined"
                type="password"
                onChange={handleChange}
                className="form-input"
                required
              />
            </div>

            <div className="form-group">
              <TextField
                name="repassword"
                id="repassword"
                label="Re-Enter Password"
                variant="outlined"
                type="password"
                onChange={handleChange}
                className="form-input"
                required
              />
            </div>
            <div className="form-group">
              <div className="upload-container">
                <Button
                  variant="text"
                  component="label"
                  startIcon={<CloudUploadIcon />}
                >
                  Upload Profile Picture
                  <input
                    name="profilePicture"
                    type="file"
                    onChange={handleProfilePictureChange}
                    hidden
                  />
                </Button>
                {isUploaded && (
                  <p className="upload-success">Uploaded successfully!</p>
                )}
              </div>
            </div>

            <div className="form-group">
              <LoadingButton
                variant="contained"
                type="submit"
                className="submit-button"
                loading={!registered}
              >
                <span>SIGN-UP</span>
              </LoadingButton>
            </div>
          </form>
        </div>
        <p className="signup-link">
          Already a VoteSafe User? <Link to="/login">Login</Link>
        </p>
      </div>
      <Footer />
    </div>
  );
}

export default Signup;
