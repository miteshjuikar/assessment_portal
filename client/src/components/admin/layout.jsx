
import { Outlet } from 'react-router-dom'
import Navbar from '../../common/header'


function AdminLayout() {


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

export default AdminLayout