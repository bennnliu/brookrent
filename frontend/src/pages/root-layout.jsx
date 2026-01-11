import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../components/navbar.jsx";
import FooterSection from "../components/footer.jsx";

export default function RootLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <main className="grow mt-20">
        <Outlet /> 
      </main>
      <FooterSection />
    </div>
  );
}
