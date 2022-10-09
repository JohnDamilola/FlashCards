import Login from 'screens/AuthScreens/Login'
import Register from 'screens/AuthScreens/Register'
import CreateCards from 'screens/DashboardScreens/CreateCards'
import CreateDeck from 'screens/DashboardScreens/CreateDeck'
import Dashboard from 'screens/DashboardScreens/Dashboard'
import Explore from 'screens/DashboardScreens/Explore'
import PracticeDeck from 'screens/DashboardScreens/PracticeDeck'
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
    exact: true,
    path: '/deck/:id/practice',
    element: <PracticeDeck />,
  },
  {
    exact: true,
    path: '/deck/:id/update',
    element: <CreateCards />,
  },
  {
    path: '/cards-create/:deckId',
    element: <CreateCards />,
  },
  {
    path: '/explore',
    element: <Explore />,
  }
]

export { authRoutes, publicRoutes, dashboardRoutes }
