
import Navbar from '@/common/header'
import { Outlet } from 'react-router-dom'


function UserLayout() {
  return (
    <>
    <div className="flex flex-col min-h-screen w-full">
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
    </div>
    </>
  )
}

export default UserLayout