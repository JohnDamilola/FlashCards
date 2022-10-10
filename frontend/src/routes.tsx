import Login from 'screens/AuthScreens/Login'
import Register from 'screens/AuthScreens/Register'
import CreateCards from 'screens/DashboardScreens/CreateCards'
import CreateDeck from 'screens/DashboardScreens/CreateDeck'
import Dashboard from 'screens/DashboardScreens/Dashboard'
import Explore from 'screens/DashboardScreens/Explore'
import PracticeDeck from 'screens/DashboardScreens/PracticeDeck'
import EditDeck from 'screens/DashboardScreens/EditDeck'
import Home from 'screens/Home'

const homeRoutes = [
  {
    path: '/',
    element: <Home />,
  }
]

const publicRoutes = [
  {
    path: '/explore',
    element: <Explore />,
  },
  {
    exact: true,
    path: '/deck/:id/practice',
    element: <PracticeDeck />,
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
    exact: true,
    path: '/deck/:id/edit',
    element: <EditDeck />,
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

export { homeRoutes, authRoutes, publicRoutes, dashboardRoutes }
