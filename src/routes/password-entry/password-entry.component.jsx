import './password-entry.styles.scss';
import { useParams } from 'react-router-dom';
import Avatar from 'boring-avatars';
import { useGlobalDataContext } from '../../contexts/global-data.context';
import { useEffect, useState } from 'react';
import { FaRegStar,FaPen } from 'react-icons/fa';
import { FaStar,FaTrash,FaRegCopy } from 'react-icons/fa6';
import { useToast } from '../../contexts/toast-context.context';

const PasswordEntry = () => {
    const {key}=useParams();
    const {globalPasswordData,handleSetGlobalPasswordData}=useGlobalDataContext();
    const [currentPasswordDetails,setCurrentPasswordDetails]=useState([]);
    const [isEditable,setIsEditable]=useState(false);
    const {showToast}=useToast();
    const [siteName,setSiteName]=useState('');
    const [username,setUserName]=useState('');
    const [password,setPassword]=useState('');

    useEffect(()=>{
        const numberKey = Number(key);
        const passwordEntry = globalPasswordData.filter(obj=>obj.key===numberKey);
        setCurrentPasswordDetails(passwordEntry)
        setSiteName(passwordEntry[0]?.site);
        setPassword(passwordEntry[0]?.password);
        setUserName(passwordEntry[0]?.username);
    },[globalPasswordData,key])

    const handleEditClick=()=>{
        setIsEditable(!isEditable);
        showToast(!isEditable ? "Editor mode":"Readonly mode")
    }
    const handleCopyClick=(text)=>{
        navigator.clipboard.writeText(text)
        showToast("Copied successfully");
    }

    return ( 
        <div className='password-entry-div'>
            <h1>
                Password entry
            </h1>
            <div className='main'>
            <div className='options'>
                <div className='pic'>
                    <Avatar variant='marble' colors={["#0a0310", "#49007e", "#ff005b", "#ff7d10", "#ffb238"]} name={currentPasswordDetails[0]?.site} size={"150"} />
                    <span>{currentPasswordDetails[0]?.site?.slice(0,1).toUpperCase()}</span>
                </div>
                <p>{currentPasswordDetails[0]?.site}</p>
                <div className='opts'>
                    <button className='blue c-btn' onClick={handleEditClick} ><FaPen/></button>
                    <button className='c-btn'><FaTrash/></button>
                    <button className='c-btn'>{currentPasswordDetails[0]?.isFav ?  <FaStar/>  :  <FaRegStar/> } </button>
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