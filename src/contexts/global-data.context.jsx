import PropTypes from "prop-types";
import { createContext, useCallback, useContext, useState } from "react";

const GlobalDataContext = createContext();

export const GlobalDataProvider=({children})=>{
    const [globalPasswordData,setGlobalPasswordData]=useState([]);
    const handleSetGlobalPasswordData=useCallback((data)=>setGlobalPasswordData(data),[]);
    return (
        <GlobalDataContext.Provider value={{globalPasswordData,handleSetGlobalPasswordData}}>
            {children}
        </GlobalDataContext.Provider>
    )
}
export const useGlobalDataContext =()=> useContext(GlobalDataContext);
GlobalDataProvider.propTypes={
    children:PropTypes.node,
}