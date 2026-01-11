import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "./navbar.jsx";
import FooterSection from "./footer.jsx";

const RootLayout = ({ user, setUser, loading }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar user={user} setUser={setUser} loading={loading} />
      <main className="grow mt-20">
        <Outlet />
      </main>
      <FooterSection />
    </div>
  );
};

export default RootLayout;
