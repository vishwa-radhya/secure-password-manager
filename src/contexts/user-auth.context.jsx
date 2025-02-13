import PropTypes from "prop-types";
import { useContext, useState } from "react";
import { createContext } from "react";

const UserAuthContext = createContext();
export const UserAuthProvider = ({children})=>{

    const [user,setUser]=useState(null);
    const [isNewGoogleAuthUser,setIsNewGoogleAuthUser]=useState(false);

    const handleSetUser=(user)=>setUser(user);
    const handeSetIsNewGoogleAuthUser=(bool)=>setIsNewGoogleAuthUser(bool);

    return(
        <UserAuthContext.Provider value={{user,handleSetUser,isNewGoogleAuthUser,handeSetIsNewGoogleAuthUser}}>
            {children}
        </UserAuthContext.Provider>
    )
}
UserAuthProvider.propTypes={
    children:PropTypes.node,
}
export const useUserAuthContext=()=>useContext(UserAuthContext);