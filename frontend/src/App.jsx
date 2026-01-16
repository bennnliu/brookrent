import { createBrowserRouter, RouterProvider } from "react-router-dom";
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
import UpdatePropertyPage from "./pages/update-property-page";
import { Toaster } from "@/components/ui/sonner"
import TermsofServicesPage from "./pages/terms-of-services-page";
import AboutUsPage from "./pages/about-us-page";
import EducationPage from "./pages/education-page";

function App() {

  const router = createBrowserRouter([
    {
      element: <RootLayout/>,
      errorElement: <ErrorNotFound />,
      children: [
        { path: "/", element: <HomePage /> },
        { path: "/auth/signup", element: <SignUpPage /> },
        { path: "/auth/login", element: <LoginPage /> },
        { path: "/lister/dashboard", element: <ListerDashboardPage /> },
        { path: "/admin/dashboard", element: <ListerDashboardPage /> },
        { path: "/lister/update/:id", element: <UpdatePropertyPage /> }, 
        { path: "/admin/update/:id", element: <UpdatePropertyPage /> },
        { path: "/renter/properties", element: <PropertiesPage /> },
        { path: "/lister/list", element: <ListPropertyPage /> },
        { path: "/admin/list", element: <ListPropertyPage /> },
        { path: "/contact", element: <ContactPage /> },
        { path: "/termsofservices", element: <TermsofServicesPage/> },
        { path: "/about", element: <AboutUsPage/> },
        { path: "/education", element: <EducationPage/> },
      ],
    },
  ]);

  return <><RouterProvider router={router} /> <Toaster position="top-center"/>;</>
   
}

export default App;
