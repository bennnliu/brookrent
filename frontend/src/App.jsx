import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";

<<<<<<< Updated upstream
import Homepage from './pages/home-page.jsx'
import SignUpPage from './pages/signup-page.jsx'
import LoginPage from './pages/login-page.jsx'
import ErrorNotFound from './pages/error-not-found.jsx'
=======
import Homepage from "./pages/home-page.jsx";
import SignUpPage from "./pages/signup-page.jsx";
import ErrorNotFound from "./pages/error-not-found.jsx";
>>>>>>> Stashed changes

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Homepage />,
      errorElement: <ErrorNotFound />,
    },
    {
<<<<<<< Updated upstream
      path:'/auth/signup',
      element: <SignUpPage/>
    },
    {
      path:'/auth/login',
      element:<LoginPage/>
    }
])
  return (
    <RouterProvider router={router}/>
  )
=======
      path: "/auth/signup",
      element: <SignUpPage />,
    },
  ]);
  return <RouterProvider router={router} />;
>>>>>>> Stashed changes
}
export default App;
