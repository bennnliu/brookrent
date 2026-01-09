import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "./navbar.jsx";
import FooterSection from "./footer.jsx";

export default function RootLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <main className="flex-grow mt-20">
        <Outlet /> {/* Child routes will render here */}
      </main>
      <FooterSection />
    </div>
  );
}
