import Login from 'screens/AuthScreens/Login'
import Register from 'screens/AuthScreens/Register'
import CreateDeck from 'screens/DashboardScreens/CreateDeck'
import Dashboard from 'screens/DashboardScreens/Dashboard'
import Explore from 'screens/DashboardScreens/Explore'
import PracticeDeck from 'screens/DashboardScreens/PracticeDeck'
import Flashcard from 'screens/FlashcardScreens/Flashcard'
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

const FlashcardRoutes = [
  {
    path: '/deck/:id/:name',
    element: <Flashcard />,
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
    path: '/deck/:id/:name/practice',
    element: <PracticeDeck />,
  },
  {
    exact: true,
    path: '/deck/:id/:name/update',
    element: <Flashcard />,
  },
  {
    path: '/explore',
    element: <Explore />,
  }
]

export { authRoutes, publicRoutes, dashboardRoutes, FlashcardRoutes }
