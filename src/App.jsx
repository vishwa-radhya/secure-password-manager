import { Fragment,useEffect } from "react"
import Sidebar from "./components/sidebar/sidebar.component"
import { Routes,Route,Navigate } from "react-router-dom"
import Home from './routes/home/home.component';
import {useUserAuthContext} from './contexts/user-auth.context';
import Intro from './routes/intro/intro.component'
import CreateUser from "./routes/create-user/create-user.component";
import Auth from "./routes/auth/auth.component";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./utils/firebase/firebase";
import PropTypes from "prop-types";

const ProtectedRoute = ({ children }) => {
  const { user } = useUserAuthContext();
  if (!user) {
    return <Navigate to="/" replace />;
  }
  return children;
};

const PublicRoute = ({ children }) => {
  const { user } = useUserAuthContext();
  if (user) {
    return <Navigate to="/dashboard" replace />;
  }
  return children;
};

function App() {
  const {user,handleSetUser}=useUserAuthContext();

  useEffect(() => {
    const checkAuthState = async () => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if(user){
          handleSetUser(user);
          // setIsLoading(false);
        }else{
          // setIsLoading(false);
          handleSetUser(null);
        }
      });
      return () => unsubscribe();
    };
    // setIsLoading(true);
    checkAuthState();      
  }, [handleSetUser]);



  return (
    <Fragment>
    <Routes>
        <Route path="/dashboard" element={
            <ProtectedRoute>
              <Sidebar />
            </ProtectedRoute>}>
          <Route index element={<Home />} />
        </Route>

        <Route path="/auth" element={
            <PublicRoute>
              <Auth />
            </PublicRoute> }/>

        <Route path="/create-user" element={
            <PublicRoute>
              <CreateUser />
            </PublicRoute>}/>

        <Route path="/" element={
            <PublicRoute>
              <Intro />
            </PublicRoute>}/>

        <Route path="*" element={<Navigate to={user ? "/dashboard" : "/"} replace />} />
      </Routes>
    </Fragment>
  )
}
ProtectedRoute.propTypes={
  children:PropTypes.node,
}
PublicRoute.propTypes={
  children:PropTypes.node,
}
export default App
