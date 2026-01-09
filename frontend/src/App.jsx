import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";

import HomePage from "./pages/home-page.jsx";
import SignUpPage from "./pages/signup-page.jsx";
import LoginPage from "./pages/login-page.jsx";
import ErrorNotFound from "./pages/error-not-found.jsx";
import ListerDashboardPage from "./pages/lister-dashboard-page";
import PropertiesPage from "./pages/properties-page";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomePage />,
      errorElement: <ErrorNotFound />,
    },
    {
      path: "/auth/signup",
      element: <SignUpPage />,
    },
    {
      path: "/auth/login",
      element: <LoginPage />,
    },
    {
      path:'/lister/dashboard',
      element: <ListerDashboardPage/>
    },
    {
      path:"/renter/properties",
      element: <PropertiesPage/>
    }
])
  return (
    <RouterProvider router={router}/>
  )
}
export default App;
