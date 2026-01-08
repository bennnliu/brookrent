import "../styling/navBar.css";
import {Link} from 'react-router-dom'

function Navbar() {
  return (
    <nav className="navbar">
      <h1 className="logo">BrookRent</h1>
      <div className="nav-buttons">
        <button className="nav-buttons-1">Login</button>
        <button className="nav-buttons-1"><Link to="/auth/signup">Sign up</Link></button>
      </div>
    </nav>
  );
}
export default Navbar;
