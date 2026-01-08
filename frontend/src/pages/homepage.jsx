import "../styling/homepage.css";
import homepageImage from "../assets/homepage.jpg";
import Navbar from "../pages/navbar.jsx";
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
          <button className="button">Rent a house</button>
          <button className="button">List properties</button>
        </div>
      </div>
    </div>
  );
}

export default Homepage;
