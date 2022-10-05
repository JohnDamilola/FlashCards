import AuthLayout from 'layouts/AuthLayout'
import HomeLayout from 'layouts/HomeLayout'
import { useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router'
import { authRoutes, cardRoutes, publicRoutes } from './routes'

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

        <Route element={<AuthLayout/>}>
          {cardRoutes.map(({ path, element }: any, index: number) => (
            <Route path={path} element={element} key={index} />
          ))}
        </Route>
      </Routes>
    </>
  )
}

export default App