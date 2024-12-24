
import { Outlet } from 'react-router-dom'


function AdminLayout() {


  return (
    <div className="flex min-h-screen w-full">
      <h1>admin</h1>
      <Outlet />
    </div>
  )
}

export default AdminLayout