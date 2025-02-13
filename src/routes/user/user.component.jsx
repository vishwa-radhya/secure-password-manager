import './user.styles.scss';
import { useState,useEffect } from 'react';
import {useUserAuthContext} from '../../contexts/user-auth.context';
import { FaUserAstronaut } from 'react-icons/fa6';
import { signOutUser } from '../../utils/firebase/firebase';

const User = () => {
    const [isUserImgLoaded,setIsUserImgLoaded]=useState(false);
    const {user}=useUserAuthContext();

    useEffect(()=>{
        const img = new Image();
        img.src = user?.photoURL;
        img.onload=()=>setIsUserImgLoaded(true);
    },[user?.photoURL]);

    return ( 
        <div className='user-div'>
            <h1>User space</h1>
            <div className='main'>
                {isUserImgLoaded ? <img src={user?.photoURL} alt='user' className='p-url' width={100} /> : <div  className='astro-user'><FaUserAstronaut/> </div>}
                <p>{user?.email}</p>
                <p>{user?.displayName || "Username"}</p>
                <button className='c-btn' onClick={signOutUser}> Sign Out</button>
            </div>
        </div>
     );
}
 
export default User;