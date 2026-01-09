import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";

import RootLayout from "./components/root-layout.jsx";
import HomePage from "./pages/homepage.jsx";
import SignUpPage from "./pages/signup-page.jsx";
import LoginPage from "./pages/login-page.jsx";
import ErrorNotFound from "./pages/error-not-found.jsx";
import ListerDashboardPage from "./pages/lister-dashboard-page.jsx";

function App() {
  const router = createBrowserRouter([
    {
      element: <RootLayout />, // Everything inside RootLayout
      errorElement: <ErrorNotFound />,
      children: [
        { path: "/", element: <HomePage /> },
        { path: "/auth/signup", element: <SignUpPage /> },
        { path: "/auth/login", element: <LoginPage /> },
        { path: "/lister/dashboard", element: <ListerDashboardPage /> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
