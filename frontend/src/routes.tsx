import Login from 'screens/AuthScreens/Login'
import Register from 'screens/AuthScreens/Register'
import Form from 'screens/CardScreens/Form'
import CardList from 'screens/CardScreens/Cardlist'
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
const cardRoutes = [
  {
    path: '/new-card',
    element: <Form/>,
  },
  {
    path: '/cards',
    element: <CardList/>,
  },
]

export { authRoutes, publicRoutes, cardRoutes}