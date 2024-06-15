import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import HomePageLayout from "../components/HomePageLayout";
import "../styles/Home.css";

export default function Home() {
  return (
    <div className="container">
      <Navbar />
      <div className="main-content">
        <HomePageLayout />
      </div>
      <div className="footer">
        <Footer />
      </div>
    </div>
  );
}
