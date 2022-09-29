import Login from 'screens/AuthScreens/Login'
import Register from 'screens/AuthScreens/Register'
import Home from 'screens/Home'

const publicRoutes = [
  {
    path: '/',
    element: <Home />,
  },
]

const authRoutes = [
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  }
]

export { authRoutes, publicRoutes }
