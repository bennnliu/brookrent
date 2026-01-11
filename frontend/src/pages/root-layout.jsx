import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../components/navbar.jsx";
import FooterSection from "../components/footer.jsx";

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
