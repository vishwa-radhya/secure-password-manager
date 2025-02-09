import { Fragment,useEffect, useState } from "react"
import { Routes,Route,Navigate } from "react-router-dom"
import Home from './routes/home/home.component';
import {useUserAuthContext} from './contexts/user-auth.context';
import Intro from './routes/intro/intro.component'
import CreateUser from "./routes/create-user/create-user.component";
import Auth from "./routes/auth/auth.component";
import { onAuthStateChanged } from "firebase/auth";
import Menubar from "./components/menubar/menubar.component";
import { auth } from "./utils/firebase/firebase";
import PropTypes from "prop-types";
import User from "./routes/user/user.component";
import PasswordHealth from './routes/password-health/password-health.component'
import Overview from "./routes/overview/overview.component";
import AuthLoader from './components/auth-loader/auth-loader.component';
import GeneratePasswords from './routes/generate-passwords/generate-passwords.component';
import CheckPasswordStrength from './routes/check-password-strength/check-password-strength.component';
import AddPasswords from './routes/add-passwords/add-passwords.component';
import AccessMethods from './routes/access-methods/access-methods.component';

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
  const [isLoading,setIsLoading]=useState(false);

  useEffect(() => {
    const checkAuthState = async () => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if(user){
          handleSetUser(user);
          setIsLoading(false);
        }else{
          setIsLoading(false);
          handleSetUser(null);
        }
      });
      return () => unsubscribe();
    };
    setIsLoading(true);
    checkAuthState();      
  }, [handleSetUser]);

  if(isLoading){
    return <AuthLoader/>
  }

  return (
    <Fragment>
    <Routes>
        <Route path="/dashboard" element={
            <ProtectedRoute>
              <Menubar />
            </ProtectedRoute>}>
          <Route index element={<Home />} />
          <Route path="generate-passwords" element={<GeneratePasswords/>} />
          <Route path="check-password-strength" element={<CheckPasswordStrength/>} />
          <Route path="access-methods" element={<AccessMethods/>} />
          <Route path="add-passwords" element={<AddPasswords/>} />
          <Route path="user" element={<User/>} />
          <Route path="password-health" element={<PasswordHealth/>} />
          <Route path="overview" element={<Overview/>} />
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
