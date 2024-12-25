
import { Outlet } from 'react-router-dom'
import CreatorNavbar from './header'


function CreatorLayout() {


  return (
    <>
    <div className="flex flex-col min-h-screen w-full">
      <CreatorNavbar />
      <main className="flex-grow">
        <Outlet />
      </main>
    </div>
    </>
  )
}

export default CreatorLayout