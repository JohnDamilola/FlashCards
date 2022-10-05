import Login from 'screens/AuthScreens/Login'
import Register from 'screens/AuthScreens/Register'
import CreateDeck from 'screens/DashboardScreens/CreateDeck'
import Dashboard from 'screens/DashboardScreens/Dashboard'
import Explore from 'screens/DashboardScreens/Explore'
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

const dashboardRoutes = [
  {
    path: '/dashboard',
    element: <Dashboard />,
  },
  {
    path: '/create-deck',
    element: <CreateDeck />,
  },
  {
    path: '/deck/:id/:name',
    element: <div>Hello</div>, // Practice Component
  },
  {
    path: '/explore',
    element: <Explore />,
  }
]

export { authRoutes, publicRoutes, dashboardRoutes }
