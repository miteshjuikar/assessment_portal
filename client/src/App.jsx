import { Route, Routes } from "react-router-dom"
import AuthLogin from "./pages/auth/login"
import AuthRegister from "./pages/auth/register"
import { useDispatch, useSelector } from "react-redux";
import CheckAuth from "./common/check-auth";
import AdminLayout from "./components/admin/layout";
import AuthLayout from "./components/auth/layout";
import UnauthPage from "./pages/auth/unauth";
import UserHome from "./pages/user/UserHome";
import UserLayout from "./components/user/UserLayout";
import CreatorLayout from "./components/creator/CreatorLayout";
import { checkAuth } from "./store/userSlice";
import { useEffect } from "react";
import CreatorHome from "./pages/creator/Home";
import CreateAssessment from "./pages/creator/CreateAssessment";
import CreatorAbout from "./common/About";
import CreatorContact from "./pages/creator/CreatorContact";
import { Skeleton } from "./components/ui/skeleton";
import AdminHome from "./pages/admin/dashboard";
import UserScore from "./pages/user/UserScore";
import AssessmentDetailById from "./pages/creator/AssessmentDetailById";
import About from "./common/About";
import TakeAssessment from "./components/user/TakeAssessment";

function App() {
  const { user, isLoading, error, isAuthenticated } = useSelector(state => state.user);
  const dispatch = useDispatch();

  useEffect(()=> {
    dispatch(checkAuth())
  }, [dispatch]);

  // if (isLoading) return <Skeleton className="w-[800] bg-black h-[600px]" />;

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
            <Route path="home" element={<AdminHome />} />
            <Route path="about" element={<CreatorAbout />} />
        </Route>

        <Route
            path="/creator"
            element={
              <CheckAuth isAuthenticated={isAuthenticated} user={user}>
                <CreatorLayout />
              </CheckAuth>
            }
          >
            <Route path="home" element={<CreatorHome />} />
            <Route path="createAss" element={<CreateAssessment />} />
            <Route path="about" element={<About />} />
            <Route path="assessment/:id" element={<AssessmentDetailById />} />
        </Route>

        <Route
            path="/user"
            element={
              <CheckAuth isAuthenticated={isAuthenticated} user={user}>
                <UserLayout />
              </CheckAuth>
            }
          >
            <Route path="home" element={<UserHome />} />
            <Route path="about" element={<CreatorAbout />} />
            <Route path="score" element={<UserScore />} />
            <Route path="assessment/:id" element={<TakeAssessment />} />
        </Route>

        <Route path="unauth-page" element={<UnauthPage />} />
      </Routes>
    </>
  )
}

export default App
