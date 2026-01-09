import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";

<<<<<<< HEAD
import HomePage from "./pages/home-page.jsx";
import SignUpPage from "./pages/signup-page.jsx";
import LoginPage from "./pages/login-page.jsx";
import ErrorNotFound from "./pages/error-not-found.jsx";
import ListerDashboardPage from "./pages/lister-dashboard-page";
import PropertiesPage from "./pages/properties-page";
=======
import RootLayout from "./components/root-layout.jsx";
import HomePage from "./pages/homepage.jsx";
import SignUpPage from "./pages/signup-page.jsx";
import LoginPage from "./pages/login-page.jsx";
import ErrorNotFound from "./pages/error-not-found.jsx";
import ListerDashboardPage from "./pages/lister-dashboard-page.jsx";
>>>>>>> c84797bbd825a8bdc8bcf3ef6cfad73494c4d121

function App() {
  const router = createBrowserRouter([
    {
<<<<<<< HEAD
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
=======
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
>>>>>>> c84797bbd825a8bdc8bcf3ef6cfad73494c4d121
}

export default App;
