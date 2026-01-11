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
import RootLayout from "./pages/root-layout.jsx";
import ListPropertyPage from "./pages/list-property-page";
import UpdatePropertyPage from "./pages/update-property-page";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check login status on refresh
  useEffect(() => {
    fetch("http://localhost:3000/auth/me", {
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) throw new Error("Not logged in");
        return res.json();
      })
      .then((data) => setUser(data))
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  const router = createBrowserRouter([
    {
<<<<<<< Updated upstream
      element: <RootLayout />,
=======
      element: <RootLayout user={user} setUser={setUser} loading={loading} />,
      errorElement: <ErrorNotFound />,
>>>>>>> Stashed changes
      children: [
        { index: true, element: <HomePage /> },
        { path: "/auth/signup", element: <SignUpPage /> },
        { path: "/auth/login", element: <LoginPage /> },
        { path: "/lister/dashboard", element: <ListerDashboardPage /> },
        { path: "/admin/dashboard", element: <ListerDashboardPage/>},
        { path: "/lister/update", element: <UpdatePropertyPage /> },
        { path: "/admin/update", element: <UpdatePropertyPage/>},
        { path: "/renter/properties", element: <PropertiesPage /> },
<<<<<<< Updated upstream
        { path: "/lister/list", element: <ListPropertyPage/> },
        { path: "/admin/list", element: <ListPropertyPage/> },
=======
        { path: "/lister/list", element: <ListPropertyPage /> },
>>>>>>> Stashed changes
        { path: "/contact", element: <ContactPage /> },
      ],
      errorElement: <ErrorNotFound />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
