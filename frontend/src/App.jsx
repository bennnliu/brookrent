import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useEffect, useState } from "react";
import "./index.css";

import SignUpPage from "./pages/signup-page.jsx";
import LoginPage from "./pages/login-page.jsx";
import ErrorNotFound from "./pages/error-not-found.jsx";
import ListerDashboardPage from "./pages/lister-dashboard-page.jsx";
import PropertiesPage from "./pages/properties-page.jsx";
import ContactPage from "./pages/contact-page.jsx";
import HomePage from "./pages/home-page.jsx";
import RootLayout from "./components/root-layout";
import ListPropertyPage from "./pages/list-property-page";
import api from "./lib/axios";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/user/userdata", {})
      .then((res) => {
        setUser(res.data);
      })
      .catch(() => {
        setUser(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const router = createBrowserRouter([
    {
      element: <RootLayout user={user} setUser={setUser} loading={loading} />,
      errorElement: <ErrorNotFound />,
      children: [
        { path: "/", element: <HomePage /> },
        { path: "/auth/signup", element: <SignUpPage /> },
        { path: "/auth/login", element: <LoginPage /> },
        { path: "/lister/dashboard", element: <ListerDashboardPage /> },
        { path: "/renter/properties", element: <PropertiesPage /> },
        { path: "/lister/list", element: <ListPropertyPage /> },
        { path: "/contact", element: <ContactPage /> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
