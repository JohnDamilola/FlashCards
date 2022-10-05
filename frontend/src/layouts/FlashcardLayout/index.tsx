import Navbar from 'components/Navbar'
import { Navigate, Outlet } from 'react-router-dom'
import './styles.scss'

const FlashcardLayout = () => {
  // const accessToken = window.localStorage.getItem('accessToken')
  const accessToken = true;

  if (!accessToken) {
    return <Navigate to='/login' replace />
  }

  return (
    <div className='flex w-full h-screen bg-white relative '>
      <div className='main flex-row w-[calc(100vw)] lg:w-[calc(100vw - 287px)] md:ml-0 lg:ml-[287px] h-full bg-[#F9F9F9]'>
        <div className='flex w-full'>
          <div className='flex-col w-full'>
            <div className='overflow-scroll px-[40px] lg:pt-12s'>
              <Navbar isDashboard={true} />
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default FlashcardLayout
