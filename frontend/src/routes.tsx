import Login from 'screens/AuthScreens/Login'
import Register from 'screens/AuthScreens/Register'
import Dashboard from 'screens/DashboardScreens/Dashboard'
import Explore from 'screens/DashboardScreens/Explore'
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
// const cardRoutes = [
//   {
//     path: '/new-card',
//     element: <Form/>,
//   },
//   {
//     path: '/cards',
//     element: <CardList/>,
//   },
// ]
const FlashcardRoutes = [
  {
    path: '/deck/:id/:name',
    element: <Flashcard />,
  },
]

const dashboardRoutes = [
  {
    path: '/dashboard',
    element: <Dashboard />,
  },
  {
    path: '/explore',
    element: <Explore />,
  }
]

export { authRoutes, publicRoutes, dashboardRoutes, FlashcardRoutes }
