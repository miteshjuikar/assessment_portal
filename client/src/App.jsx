import { Route, Routes } from "react-router-dom"
import AuthLogin from "./pages/auth/login"
import AuthRegister from "./pages/auth/register"
import { useSelector } from "react-redux";
import CheckAuth from "./common/check-auth";
import AdminDashboard from "./pages/admin/dashboard";
import AdminLayout from "./components/admin/layout";
import AuthLayout from "./components/auth/layout";
import UnauthPage from "./pages/auth/unauth";

function App() {
  const { user, isLoading, error, isAuthenticated } = useSelector(state => state.user);

  return (
    <>
      <Routes>
        
        <Route 
          path="/" 
          element={
            <CheckAuth
              isAuthenticated={isAuthenticated}
              user={user}
            ></CheckAuth>
          }/>

        <Route
          path="/auth"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <AuthLayout />
            </CheckAuth>
          }
        >
          <Route path="/auth/login" element={<AuthLogin />}/>
          <Route path="/auth/register" element={<AuthRegister />}/>
        </Route>

        <Route
            path="/admin"
            element={
              <CheckAuth isAuthenticated={isAuthenticated} user={user}>
                <AdminLayout />
              </CheckAuth>
            }
          >
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="products" element={<h1>Product</h1>} />
        </Route>


        <Route path="unauth-page" element={<UnauthPage />} />
      </Routes>
    </>
  )
}

export default App
