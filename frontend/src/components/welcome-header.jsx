import { Outlet } from "react-router-dom";
import NavBar from "./navbar";
import FooterSection from "./footer";

const RootLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <main className="grow mt-20">
        <Outlet />
      </main>
      <FooterSection />
    </div>
  );
};

export default RootLayout;
