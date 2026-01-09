import "../styling/homepage.css";
import homepageImage from "../assets/homepage.jpg";
import Navbar from "../components/navbar.jsx";
import { Button } from "@/components/ui/button";

function Homepage() {
  return (
    <div
      className="homepage"
      style={{ backgroundImage: `url(${homepageImage})` }}
    >
      <Navbar />

      <div className="quote">
        <h2>Welcome to BrookRent</h2>

        <div className="button-group">
          <Button className="button">Rent a house</Button>
          <Button className="button">List properties</Button>
        </div>
      </div>
    </div>
  );
}

export default Homepage;
