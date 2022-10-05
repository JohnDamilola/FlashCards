import AuthLayout from 'layouts/AuthLayout'
import DashboardLayout from 'layouts/DashboardLayout'
import HomeLayout from 'layouts/HomeLayout'
import { useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router'
import { authRoutes, dashboardRoutes, publicRoutes } from './routes'

const App = () => {
  const location = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location])

  return (
    <>
      <Routes>
        <Route element={<HomeLayout />}>
          {publicRoutes.map(({ path, element }: any, index: number) => (
            <Route path={path} element={element} key={index} />
          ))}
        </Route>

        <Route element={<AuthLayout />}>
          {authRoutes.map(({ path, element }: any, index: number) => (
            <Route path={path} element={element} key={index} />
          ))}
        </Route>

        <Route element={<DashboardLayout />}>
          {dashboardRoutes.map(({ path, element }: any, index: number) => (
            <Route path={path} element={element} key={index} />
          ))}
        </Route>
      </Routes>
    </>
  )
}

export default App