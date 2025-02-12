import './all-passwords.styles.scss';
import { FaRegCopy } from "react-icons/fa6";
import Avatar from 'boring-avatars';
import AsyncLoader from '../../components/async-loader/async-loader.component';
import { useEffect, useState } from 'react';
import { FaRegStar,FaStar } from "react-icons/fa";
import { useToast } from '../../contexts/toast-context.context';
import ToggleSwitch from '../../components/toggle-switch/toggle-switch.component';
import { useGlobalDataContext } from '../../contexts/global-data.context';

const stateText={
    "loading":"Getting things ready",
    "error":"Error occured! Try again later",
    "empty":"Nothing yet!"
}

const data=[ {key:1,username:"my user name is long longger",password:"longer password has",site:"google.com",isFav:false} ,{key:1,username:"my user name is long",password:"longer password has",site:"facbook.com",isFav:false},{key:1,username:"my user name is long",password:"longer password has",site:"github.com",isFav:false},{key:1,username:"my user name is long",password:"longer password has",site:"netlify.com",isFav:true},{key:1,username:"my user name is long",password:"longer password has",site:"samsung.in",isFav:false},{key:1,username:"my user name is long",password:"longer password has",site:"my secure site",isFav:false},{key:1,username:"my user name is long",password:"longer password has",site:"my secure site",isFav:false},{key:1,username:"my user name is long",password:"longer password has",site:"my secure site",isFav:false},{key:1,username:"my user name is long",password:"longer password has",site:"algoexper.io",isFav:false},{key:1,username:"my user name is long",password:"longer password has",site:"johnmiller.co",isFav:false},{key:1,username:"my user name is long",password:"longer password has",site:"pepsico.inc",isFav:false},{key:1,username:"my user name is long",password:"longer password has",site:"metaplatforms.com",isFav:false},{key:1,username:"my user name is long",password:"longer password has",site:"navbar.gallery",isFav:false}];

const AllPasswords = () => {

    const [passwordData,setPasswordData]=useState(data);
    const [passwordsState,setPasswordsState]=useState(''); //loading,error,empty,
    const {showToast}=useToast();
    const [inputValue,setInputValue]=useState('');
    const [showFavourites,setShowFavourites]=useState(false);
    const {globalPasswordData,handleSetGlobalPasswordData}=useGlobalDataContext();


    const handleCopyClick=(password)=>{
        showToast("Copied to clipboard")
    }

    const handleFavClick=(isFav)=>{
        showToast(!isFav ? "Added to favourites": "Removed from favourites")
    }

    useEffect(()=>{
        handleSetGlobalPasswordData(data);
    },[])

    useEffect(()=>{
        const filteredData = globalPasswordData.filter(obj=>obj.site.toLowerCase().startsWith(inputValue.toLowerCase()))
        setPasswordData(filteredData)
    },[inputValue,globalPasswordData])

    useEffect(()=>{
        if(showFavourites){
            const favData=globalPasswordData.filter(obj=>obj.isFav);
            setPasswordData(favData)
        }else{
            setPasswordData(globalPasswordData)
        }
    },[showFavourites,globalPasswordData])

    if(passwordsState === "loading" || passwordsState === "empty" || passwordsState === "error"){
        return <AsyncLoader text={stateText[passwordsState]} ls={"70px"} type={passwordsState} />
    }


    return ( 
        <div className='all-passwords-div'>
            <h1>All passwords</h1>
            <div className='opts'>
                <div >
                    <input maxLength={100} type='search' placeholder='search' className='c-input' value={inputValue} onChange={(e)=>setInputValue(e.target.value)} />
                </div>
                <div className='favs'>
                    <span>Favourites</span>
                    <ToggleSwitch bool={showFavourites} set={setShowFavourites} />
                </div>
            </div>
            <div className='main'>
                {passwordData.map((d,index)=>{
                    return <div className='tile' key={`pass-data-${index}`}>
                        <div className='pic'>
                            <Avatar variant='marble' colors={["#0a0310", "#49007e", "#ff005b", "#ff7d10", "#ffb238"]} name={d.site} size={"42"} />
                            <span>{d.site.slice(0,1).toUpperCase()}</span>
                        </div>
                        <div className='info'>
                            <p className='bold'>{d.site}</p>
                            <p className='small'>{d.username}</p>
                        </div>
                        <div className='arrow' >
                            <div onClick={()=>handleCopyClick(d.password)}>
                            <FaRegCopy/>
                            </div>
                            <div onClick={()=>handleFavClick(d.isFav)}>
                                {!d.isFav ? <FaRegStar/> : <FaStar style={{color:"gray"}} />}
                            </div>
                        </div>
                    </div>
                })}
            </div>
        </div>
     );
}
 
export default AllPasswords;