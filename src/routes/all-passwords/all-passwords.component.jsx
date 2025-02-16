import './all-passwords.styles.scss';
import AsyncLoader from '../../components/async-loader/async-loader.component';
import {  useState,useMemo } from 'react';
import { useToast } from '../../contexts/toast-context.context';
import ToggleSwitch from '../../components/toggle-switch/toggle-switch.component';
import { useUserAuthContext } from '../../contexts/user-auth.context';
import { useGlobalDataContext } from '../../contexts/global-data.context';
import { useGlobalUserDataContext } from '../../contexts/global-user-data.context';
import { useKeyGenerationContext } from '../../contexts/key-generation.context';
import AuthenticationForm from '../../components/authentication-form/authentication-form.component';
import { handleKeySelectionAndDecryptionProcess } from '../../utils/helpers/globalFunctions';
import { FaRegStar,FaStar } from "react-icons/fa";
import { FaRegCopy } from "react-icons/fa6";
import Avatar from 'boring-avatars';
import { useNavigate } from 'react-router-dom';
import { handleFavClick } from '../../utils/helpers/globalFunctions';

const stateText={
    "loading":"Getting things ready",
    "error":"Error occured! Try again later",
    "empty":"Nothing yet!"
}

const AllPasswords = () => {
    
    const {showToast}=useToast();
    const [inputValue,setInputValue]=useState('');
    const [showFavourites,setShowFavourites]=useState(false);
    const {isAuthenticatedWithPassword}=useUserAuthContext();
    const {globalPasswordData,passwordsState}=useGlobalDataContext();
    const {userData}=useGlobalUserDataContext();
    const {userKeys}=useKeyGenerationContext();
    const router = useNavigate();

    const handleCopyClick=async(passwordEntry)=>{
        try{
            const decryptedPassword = await handleKeySelectionAndDecryptionProcess(passwordEntry,userKeys);
            navigator.clipboard.writeText(decryptedPassword);
            showToast("Copied to clipboard");
        }catch(e){
            console.error(e);
            showToast("Error occured please try again")
        }
    }

    const handleFavouritesClick=(isFavourite,key)=>{
        const result = handleFavClick(isFavourite,key,userData?.favouritesCount)
        showToast(result ? `${!isFavourite ? "Added to favourites": "Removed from favourites"}` : "error occured! Try again later")
    }

    const filteredPasswords = useMemo(() => {
        return globalPasswordData
          .filter(obj =>
            obj.inputSite.toLowerCase().startsWith(inputValue.toLowerCase())
          )
          .filter(obj => (showFavourites ? obj.isFavourite : true));
      }, [globalPasswordData, inputValue, showFavourites]);

    if(!isAuthenticatedWithPassword){
        return <AuthenticationForm />
    }

    if(passwordsState === "loading"  || passwordsState === "error" || passwordsState === "empty"){
        return <AsyncLoader text={stateText[passwordsState]} ls={"70px"} type={passwordsState} />
    }


    return ( 
        <div className='all-passwords-div'>
            <h1>All passwords</h1>
            <div className='opts'>
                <div >
                    <input maxLength={100} type='search' placeholder='search by site' className='c-input' value={inputValue} onChange={(e)=>setInputValue(e.target.value)} />
                </div>
                <div className='favs'>
                    <span>Favourites</span>
                    <ToggleSwitch bool={showFavourites} set={setShowFavourites} />
                </div>
            </div>
            <div className='main'>
                {filteredPasswords.map((d)=>{
                    return <div className='tile' key={d.key}>
                        <div className='pic'>
                            <Avatar variant='marble' colors={["#0a0310", "#49007e", "#ff005b", "#ff7d10", "#ffb238"]} name={d.inputSite} size={"42"} />
                            <span>{d.inputSite.slice(0,1).toUpperCase()}</span>
                        </div>
                        <div className='info' onClick={()=>router(`/dashboard/password-entry/${d.key}`)}>
                            <p className='bold'>{d.inputSite}</p>
                            <p className='small'>{d.inputUsername}</p>
                        </div>
                        <div className='arrow' >
                            <div onClick={()=>handleCopyClick(d)}>
                            <FaRegCopy/>
                            </div>
                            <div onClick={()=>handleFavouritesClick(d.isFavourite,d.key)}>
                                {!d.isFavourite ? <FaRegStar/> : <FaStar style={{color:"gray"}} />}
                            </div>
                        </div>
                    </div>
                })}
            </div>
        </div>
     );
}
 
export default AllPasswords;