import { onChildAdded, onChildChanged, onChildRemoved, ref,off } from "firebase/database";
import PropTypes from "prop-types";
import { createContext,  useContext, useEffect, useState } from "react";
import { realtimeDb } from "../utils/firebase/firebase";
import { useUserAuthContext } from "./user-auth.context";

const GlobalDataContext = createContext();

export const GlobalDataProvider=({children})=>{
    const [globalPasswordData,setGlobalPasswordData]=useState([]);
    const [passwordsState,setPasswordsState]=useState(''); // loading, error
    const {user}=useUserAuthContext();

    useEffect(()=>{
        if(!user) return;
        setPasswordsState('loading')
        const passwordsDataRef = ref(realtimeDb,`userPasswords/${user.uid}`);

        const handlePasswordsAdd=(snapshot)=>{
            const data = snapshot.val();
            const key = snapshot.key;
            if(data){
                const {inputSite,inputUsername,
                    encryptionMethod,iv,
                    cipherText,isFavourite,timestamp}=data;
                    setGlobalPasswordData(prev=>[...prev,{
                        key,
                        inputSite,
                        inputUsername,
                        encryptionMethod,iv,
                        cipherText,isFavourite,timestamp
                    }])
            }
        }

        const handlePasswordsChange=(snapshot)=>{
            const data = snapshot.val();
            const key = snapshot.key;
            if(data){
                const {inputSite,inputUsername,
                    encryptionMethod,iv,
                    cipherText,isFavourite,timestamp}=data;
                setGlobalPasswordData(prev=>prev.map(password=>{
                    return password.key === key ? {key,
                        inputSite,
                        inputUsername,
                        encryptionMethod,iv,
                        cipherText,isFavourite,timestamp} : password
                }))
            }
        }

        const handlePasswordsRemoval=(snapshot)=>{
            const key = snapshot.key;
            setGlobalPasswordData(prev=>prev.filter(passowrd=>passowrd.key!== key));
        }

        try{
            onChildAdded(passwordsDataRef,handlePasswordsAdd);
            onChildChanged(passwordsDataRef,handlePasswordsChange);
            onChildRemoved(passwordsDataRef,handlePasswordsRemoval);
        }catch(e){
            console.error("error while fetching passwords");
            setPasswordsState("error");
        }
        return ()=>{
            off(passwordsDataRef);
        }
    },[user])

    useEffect(() => {
        if (globalPasswordData.length > 0) {
            setPasswordsState('');
          } else {
            setPasswordsState('empty');
          }
      }, [globalPasswordData, passwordsState])

    return (
        <GlobalDataContext.Provider value={{globalPasswordData,passwordsState}}>
            {children}
        </GlobalDataContext.Provider>
    )
}
export const useGlobalDataContext =()=> useContext(GlobalDataContext);
GlobalDataProvider.propTypes={
    children:PropTypes.node,
}