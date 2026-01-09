import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import './index.css'

import Homepage from './pages/home-page.jsx'
import SignUpPage from './pages/signup-page.jsx'
import LoginPage from './pages/login-page.jsx'
import ErrorNotFound from './pages/error-not-found.jsx'

function App() {
  const router = createBrowserRouter([
    {
      path:'/',
      element: <Homepage/>,
      errorElement: <ErrorNotFound/>
    },
    {
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
}
export default App