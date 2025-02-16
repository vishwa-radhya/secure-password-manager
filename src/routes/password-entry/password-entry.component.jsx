import './password-entry.styles.scss';
import { useParams } from 'react-router-dom';
import { useGlobalDataContext } from '../../contexts/global-data.context';
import { useKeyGenerationContext } from '../../contexts/key-generation.context';
import { useGlobalUserDataContext } from '../../contexts/global-user-data.context';
import { useEffect, useState } from 'react';
import { useToast } from '../../contexts/toast-context.context';
import { FaRegStar,FaPen } from 'react-icons/fa';
import { FaStar,FaTrash,FaRegCopy } from 'react-icons/fa6';
import Avatar from 'boring-avatars';
import { decryptData } from '../../utils/helpers/hash';
import { handleFavClick } from '../../utils/helpers/globalFunctions';

const PasswordEntry = () => {
    const {key}=useParams();
    const {globalPasswordData}=useGlobalDataContext();
    const [currentPasswordDetails,setCurrentPasswordDetails]=useState([]);
    const [isEditable,setIsEditable]=useState(false);
    const [isEditingDisabled,setIsEditingDisabled]=useState(false);
    const {showToast}=useToast();
    const {userData}=useGlobalUserDataContext();
    const {userKeys}=useKeyGenerationContext();
    const [siteName,setSiteName]=useState('');
    const [username,setUserName]=useState('');
    const [password,setPassword]=useState('');
    
    const handleEditClick=()=>{
        setIsEditable(!isEditable);
        showToast(!isEditable ? "Editor mode":"Readonly mode")
    }
    const handleCopyClick=(text)=>{
        navigator.clipboard.writeText(text)
        showToast("Copied successfully");
    }

    const handleFavouritesClick=(isFavourite,key)=>{
      if(key){
        const result = handleFavClick(isFavourite,key,userData?.favouritesCount)
        showToast(result ? `${!isFavourite ? "Added to favourites": "Removed from favourites"}` : "error occured! Try again later")
      }
    }

    useEffect(() => {
        const passwordEntry = globalPasswordData.find(obj => obj.key === key);
        if (passwordEntry) {
          setCurrentPasswordDetails(passwordEntry);
          setSiteName(passwordEntry.inputSite);
          setUserName(passwordEntry.inputUsername);
          
          const decryptPassword = async () => {
            try {
              const decryptionKey = passwordEntry.encryptionMethod === "AES-128"
                ? await crypto.subtle.importKey(
                    "raw",
                    userKeys.userAes128Key,
                    { name: "AES-GCM" },
                    true,
                    ["decrypt"]
                  )
                : await crypto.subtle.importKey(
                    "raw",
                    userKeys.userAes256Key,
                    { name: "AES-GCM" },
                    true,
                    ["decrypt"]
                  );
              const decrypted = await decryptData(passwordEntry.cipherText, passwordEntry.iv, decryptionKey);
              setPassword(decrypted);
            } catch (error) {
              console.error("Error during decryption", error);
              showToast("Failed to decrypt password");
              setIsEditingDisabled(true)
            }
          };
    
          if (userKeys) {
            decryptPassword();
          }
        }
      }, [globalPasswordData, key, userKeys, showToast]);

    return ( 
        <div className='password-entry-div'>
            <h1>
                Password entry
            </h1>
            <div className='main'>
            <div className='options'>
                <div className='pic'>
                    <Avatar variant='marble' colors={["#0a0310", "#49007e", "#ff005b", "#ff7d10", "#ffb238"]} name={currentPasswordDetails?.inputSite} size={"150"} />
                    <span>{currentPasswordDetails?.inputSite?.slice(0,1).toUpperCase()}</span>
                </div>
                <p>{currentPasswordDetails?.inputSite}</p>
                <div className='opts'>
                    <button className='blue c-btn' onClick={handleEditClick} disabled={isEditingDisabled} ><FaPen/></button>
                    <button className='c-btn'><FaTrash/></button>
                    <button className='c-btn' onClick={()=>handleFavouritesClick(currentPasswordDetails?.isFavourite,currentPasswordDetails?.key)}>{currentPasswordDetails?.isFavourite ?  <FaStar/>  :  <FaRegStar/> } </button>
                </div>
            </div>
            <div className='fields'>
                <div className='inputs'>
                    <div>
                        <label>Username <span><FaRegCopy onClick={()=>handleCopyClick(username)} /></span></label>
                        <input className='c-input' maxLength={80} value={username}  readOnly={!isEditable} onChange={(e)=>setUserName(e.target.value)} spellCheck={false} />
                    </div>
                    <div>
                        <label>Password <span><FaRegCopy onClick={()=>handleCopyClick(password)} /></span></label>
                        <input className='c-input' maxLength={100} value={password} readOnly={!isEditable} onChange={(e)=>setPassword(e.target.value)} spellCheck={false} />
                    </div>
                    <div>
                        <label>Site <span><FaRegCopy onClick={()=>handleCopyClick(siteName)} /></span></label>
                        <input className='c-input' maxLength={100} value={siteName} readOnly={!isEditable} onChange={(e)=>setSiteName(e.target.value)} spellCheck={false} />
                    </div>
                </div>
                <button className='c-btn confirm-changes' disabled={!isEditable} >Confirm changes</button>
            </div>
            </div>
        </div>
     );
}
 
export default PasswordEntry;