
import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Link } from 'react-router-dom';
import { logoutUser } from '@/store/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useToast } from '@/hooks/use-toast';
import { ToastAction } from '../ui/toast';

function CreatorNavbar() {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const { toast } = useToast();
  const { user } = useSelector(state => state.user); 

  function handleLogout() {
    
    dispatch(logoutUser()).then((data)=>{
      if(data?.payload?.success){
        toast({
          title: data?.payload?.message,
          description: "Welcome back",
          action: (
            <ToastAction altText="Goto schedule to undo">Undo</ToastAction>
          ),
        })
      }
      else{
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: data?.payload?.message,
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        })
      }
    });
  }

  return (
    <nav className="bg-white text-gray-900 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo Section */}
          <div className="flex-shrink-0 text-2xl font-bold space-x-4 mr-4">
            <span>MyLogo</span>
          </div>
      {user?.role === "creator" ?
          <div className="hidden md:flex space-x-8">
            <Link to="/creator/home" className="text-gray-700 hover:text-blue-600 transition duration-300">Home</Link>
            <Link to="/creator/about" className="text-gray-700 hover:text-blue-600 transition duration-300">About</Link>
            <Link to="/creator/createAss" className="text-gray-700 hover:text-blue-600 transition duration-300">Create Assessment</Link>
            <Link to="/creator/contact" className="text-gray-700 hover:text-blue-600 transition duration-300">Contact</Link>
          </div>
      :
        user?.role === "admin" ?

          <div className="hidden md:flex space-x-8">
            <Link to="/admin/home" className="text-gray-700 hover:text-blue-600 transition duration-300">Home</Link>
            <Link to="/admin/about" className="text-gray-700 hover:text-blue-600 transition duration-300">About</Link>
          </div>
        :
          <div className="hidden md:flex space-x-8">
            <Link to="/user/home" className="text-gray-700 hover:text-blue-600 transition duration-300">Home</Link>
            <Link to="/user/about" className="text-gray-700 hover:text-blue-600 transition duration-300">About</Link>
            <Link to="/user/score" className="text-gray-700 hover:text-blue-600 transition duration-300">Assessment Score</Link>
          </div>
      }

          <div className="ml-auto hidden md:flex items-center space-x-4">
            <Button className="bg-red-600 text-white p-2 rounded-md hover:bg-red-700 transition duration-300"
            onClick={handleLogout}
            >
              Logout
            </Button>
          </div>

          <div className="md:hidden">
            <Button
              onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
              className="bg-transparent text-gray-700 border border-gray-700 p-2 rounded"
            >
              Menu
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          user?.role === "admin" ? 

          <div className="md:hidden mt-4 space-y-4 bg-white shadow-lg p-4">
            <Link to="/admin/home" className="block text-gray-700">Home</Link>
            <Link to="/admin/about" className="block text-gray-700">About</Link>
            <Link to="/" onClick={handleLogout} className="block text-red-600">Logout</Link> 
          </div>
        : 
          user?.role === "creator" ?

          <div className="md:hidden mt-4 space-y-4 bg-white shadow-lg p-4">
            <Link to="/creator/home" className="block text-gray-700">Home</Link>
            <Link to="/creator/about" className="block text-gray-700">About</Link>
            <Link to="/creator/createAss" className="block text-gray-700">Create Assessment</Link>
            <Link to="/creator/contact" className="block text-gray-700">Contact</Link>
            <Link to="/" onClick={handleLogout} className="block text-red-600">Logout</Link> 
          </div>
          :
          <div className="md:hidden mt-4 space-y-4 bg-white shadow-lg p-4">
            <Link to="/user/home" className="block text-gray-700">Home</Link>
            <Link to="/user/about" className="block text-gray-700">About</Link>
            <Link to="/user/score" className="block text-gray-700">Assessment Score</Link>
            <Link to="/" onClick={handleLogout} className="block text-red-600">Logout</Link> 
          </div>
        )}
      </div>
    </nav>
  );
}

export default CreatorNavbar;
