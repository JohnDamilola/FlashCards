import Navbar from 'components/Navbar'
import { Navigate, Outlet } from 'react-router-dom'

const AuthLayout = () => {
  const flashCardUser = window.localStorage.getItem('flashCardUser');
  const isAuth = flashCardUser && JSON.parse(flashCardUser) ? true : false;

  if (isAuth) {
    return <Navigate to='/dashboard' replace />
  }

  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  )
}

export default AuthLayout
