import './add-passwords.styles.scss'
import PasswordCheck from '../../components/password-check/password-check.component';
import SubmitButton from '../../components/submit-button/submit-button.component';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserAuthContext } from '../../contexts/user-auth.context';
import { useKeyGenerationContext } from '../../contexts/key-generation.context';
import AuthenticationForm from '../../components/authentication-form/authentication-form.component';
import RadioButton from '../../components/radio-button/radio-button.component';
import { FaBullseye } from "react-icons/fa";

const AddPasswords = () => {

        const [passType,setPassType]=useState('password');
        const [inputPassword,setInputPassword]=useState("");
        const [inputUsername,setInputUsername]=useState("");
        const [inputSite,setInputSite]=useState("");
        const [encryptionMethod,setEncryptionMethod]=useState("AES-128");
        const [encodingMethod,setEncodingMethod]=useState("Base 64");
        const {isAuthenticatedWithPassword}=useUserAuthContext();
        const {userKeys}=useKeyGenerationContext();
        const router = useNavigate();
        // console.log(userKeys);
        
    const handleSubmit=(event)=>{
        event.preventDefault();
    }
    const handlePassType=()=>{
        setPassType(prev=>{
            if(prev === 'password'){
                return 'text'
            }else{
                return 'password'
            }
        })
      }

    if(!isAuthenticatedWithPassword){
        return <AuthenticationForm />
    }
    
    return ( 
        <div className='add-passwords-div'>
            <h1>Add your passwords</h1>
            <div className='main'>
                <div className='interface'>
                <h3>Enter your details</h3>
                    <form onSubmit={handleSubmit}>
                        <input className='c-input' placeholder='Username or email' required maxLength={80} value={inputUsername} onChange={(e)=>setInputUsername(e.target.value)}  />
                        <div className='pass'>
                        <input className='c-input' placeholder='Password' maxLength={100} type={passType} required value={inputPassword} onChange={(e)=>setInputPassword(e.target.value)} />
                        <FaBullseye className='eye' onClick={handlePassType}  />
                        </div>
                        <input className='c-input' placeholder='Site' required maxLength={100} value={inputSite} onChange={(e)=>setInputSite(e.target.value)} />
                        <SubmitButton text={"Add password"} />
                    </form>
                    <div className='encrypt-method'>
                        <h4>Encryption method</h4>
                        <div>
                        <RadioButton text={"AES-128"} setMethod={setEncryptionMethod} state={encryptionMethod} groupName={"encryption"} />
                        <RadioButton text={"AES-256"} setMethod={setEncryptionMethod} state={encryptionMethod} groupName={"encryption"} />
                        </div>
                    </div>
                    <div className='encode-method'>
                    <h4>Encoding method</h4>
                        <div>
                        <RadioButton text={"Base 64"} setMethod={setEncodingMethod} state={encodingMethod} groupName={"encoding"} />
                        </div>
                    </div>
                </div>
                <div className='advisor'>
                    <PasswordCheck password={inputPassword} />
                <div className='info'>
                    <h2>Password security</h2>
                    <p>Learn how your passwords are securely stored at rest and transit</p>
                    <p>See what process is used in maintaing the integrity of your passwords</p>
                    <button className='c-btn' onClick={()=>router('/dashboard/info-docs')}>Public info</button>
                </div>
                </div>
            </div>
        </div>
     );
}
 
export default AddPasswords;