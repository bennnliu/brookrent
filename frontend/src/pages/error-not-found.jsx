import { Link } from "react-router-dom";
import NavBar from "../components/navbar.jsx";
import { Button } from "@/components/ui/button";
import React from "react";


const ErrorNotFound = ({ user, setUser, loading }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar user={user} setUser={setUser} loading={loading} />

      <main className="grow flex flex-col items-center justify-center text-center px-4 mt-24">
        <h1 className="text-5xl font-bold mb-4 text-gray-900">
          Oops! The page you were looking for doesn't exist
        </h1>
        <p className="text-gray-600 mb-8 text-lg">
          You may have mistyped the address or the page may have moved.
        </p>
        <Button
          asChild
          className="bg-[rgb(153,0,0)] hover:bg-[rgb(120,0,0)] text-white transition-colors"
        >
          <Link to="/">Go back to homepage</Link>
        </Button>
      </main>
    </div>
  );
};

export default ErrorNotFound;
