function HomeOwner() {
  return <button>List your home</button>;
}

function Renters() {
  return <button>Rent a house</button>;
}

function Login() {
  return <button>Login</button>;
}

function Sign() {
  return <button>Sign up</button>;
}

function Homepage() {
  return (
    <div>
      <HomeOwner />
      <Renters />
      <Login />
      <Sign />
    </div>
  );
}

export default Homepage;
