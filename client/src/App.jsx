import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NotFound from "./pages/NotFound";
import CreatorProfile from "./pages/CreatorProfile";
import VoterProfile from "./pages/VoterProfile";
import CandidateProfile from "./pages/CandidateProfile";
import ResetPassword from "./pages/ResetPassword";
import EmailInput from "./pages/EmailInput";
import VoteCasting from "./pages/VoteCasting";
import Result from "./pages/Result";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/voter/:id" element={<VoterProfile />} />
          <Route path="/candidate/:id" element={<CandidateProfile />} />
          <Route path="/creator/:id" element={<CreatorProfile />} />
          <Route path="/resetpassword/:id/:token" element={<ResetPassword />} />
          <Route path="/email-input" element={<EmailInput />} />
          <Route
            path="/voter/:id/vote-casting/:eid"
            element={<VoteCasting />}
          />
          <Route path="/:vid/result/:id" element={<Result />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
