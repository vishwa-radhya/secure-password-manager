import { Fragment,useEffect } from "react"
import Sidebar from "./components/sidebar/sidebar.component"
import { Routes,Route } from "react-router-dom"
import Home from './routes/home/home.component';
import {useUserAuthContext} from './contexts/user-auth.context';
import Intro from './routes/intro/intro.component'
import CreateUser from "./routes/create-user/create-user.component";
import Auth from "./routes/auth/auth.component";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./utils/firebase/firebase";

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
    {user ? <Routes>
      <Route path="/" element={<Sidebar/>}>
        <Route index element={<Home/>} />
      </Route>
    </Routes> : 
    <Routes>
      <Route path="/" element={<Intro/>}  />
      <Route path="auth" element={<Auth/>} />
      <Route path="create-user" element={<CreateUser/>} />
    </Routes>}
    </Fragment>
  )
}

export default App
