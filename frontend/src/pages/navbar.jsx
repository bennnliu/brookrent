import "../styling/navBar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <h1 className="logo">BrookRent</h1>
      <div className="nav-buttons">
        <button className="nav-buttons-1">Login</button>
        <button className="nav-buttons-1">Sign up</button>
      </div>
    </nav>
  );
}
export default Navbar;
