import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";

import SignUpPage from "./pages/signup-page.jsx";
import LoginPage from "./pages/login-page.jsx";
import ErrorNotFound from "./pages/error-not-found.jsx";
import ListerDashboardPage from "./pages/lister-dashboard-page.jsx";
import PropertiesPage from "./pages/properties-page.jsx";
import ContactPage from "./pages/contact-page.jsx";
import HomePage from "./pages/home-page.jsx";
import RootLayout from "./components/root-layout.jsx";
import ListPropertyPage from "./pages/list-property-page";

function App() {
  const router = createBrowserRouter([
    {
      element: <RootLayout />,
      errorElement: <ErrorNotFound />,
      children: [
        { path: "/", element: <HomePage /> },
        { path: "/auth/signup", element: <SignUpPage /> },
        { path: "/auth/login", element: <LoginPage /> },
        { path: "/lister/dashboard", element: <ListerDashboardPage /> },
        { path: "/renter/properties", element: <PropertiesPage /> },
        { path: "/lister/list", element: <ListPropertyPage/> },
        { path: "/contact", element: <ContactPage /> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
