import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import votercard from "../assets/voter.png";
import candidatecard from "../assets/candidate.png";
import creatorcard from "../assets/creator.png";
import "../styles/UserDescriptionCard.css";

export default function UserDescriptionCard() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <h2 className="sub-main-description" style={{ textAlign: "center" }}>
            What actions are possible with VoteSafe?
          </h2>
        </Grid>
        <Grid
          item
          xs={4}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Card sx={{ maxWidth: 345 }} className="card">
            <CardMedia
              sx={{ height: 140 }}
              image={votercard}
              title="green iguana"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Vote
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Voters log in securely, cast their votes for candidates, and
                receive notifications about successful votes and election
                results via email.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid
          item
          xs={4}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Card sx={{ maxWidth: 345 }} className="card">
            <CardMedia
              sx={{ height: 140 }}
              image={candidatecard}
              title="green iguana"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Compete
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Candidates monitor both past and upcoming elections they're
                involved in, anticipating results and staying engaged in the
                electoral process.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid
          item
          xs={4}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Card sx={{ maxWidth: 345 }} className="card">
            <CardMedia
              sx={{ height: 140 }}
              image={creatorcard}
              title="green iguana"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Create An Election
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Election creators manage candidate registration, voter
                enrollment, and result announcements for efficient election
                administration.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
