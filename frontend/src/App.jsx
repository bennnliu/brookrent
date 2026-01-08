import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import './index.css'

import Homepage from './pages/homepage.jsx'
import SignUpPage from './pages/signup-page.jsx'
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
    }
])
  return (
    <RouterProvider router={router}/>
  )
}
export default App