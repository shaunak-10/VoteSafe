import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import "../styles/MainDescription.css";
import image from "../assets/mainPageImage.jpg";

export default function MainDescription() {
  return (
    <Box sx={{ flexGrow: 1 }} className="main-description-container">
      <Grid container spacing={2}>
        <Grid item xs={7}>
          <h1 className="main-description">Welcome to VoteSafe!</h1>
          <h2 className="sub-main-description">
            Revolutionize democracy with VoteSafe, where your voice and <br />
            vote are secured by blockchain technology. Our tamper-proof <br />
            and transparent voting system ensures the integrity of every ballot.
            <br />
            Join us and shape the future of elections!
          </h2>
        </Grid>
        <Grid item xs={5}>
          <img src={image} alt="blockchain" className="main-image" />
        </Grid>
      </Grid>
    </Box>
  );
}
