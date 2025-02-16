import './add-password-dialog.styles.scss';
import { useUserAuthContext } from '../../contexts/user-auth.context';
import { useState } from 'react';
import { hashPassword } from '../../utils/helpers/hash';
import { realtimeDb } from '../../utils/firebase/firebase';
import { ref,update } from 'firebase/database';
import SubmitButton from '../submit-button/submit-button.component';
import { FcGoogle } from "react-icons/fc";
import { FaBullseye } from "react-icons/fa";


const AddPasswordDialog = () => {

    const {handeSetIsNewGoogleAuthUser,user}=useUserAuthContext();
    const [passType,setPassType]=useState('password');
    const [password,setPassword]=useState('');
    const [confirmPassword,setConfirmPassword]=useState('');
    const [isMasterPasswordCreated,setIsMasterPasswordCreated]=useState(false);
    const [statusMessage,setStatusMessage]=useState('_'); //unmatched passwords, error
    
    const handlePassType=()=>{
        setPassType(prev=>{
            if(prev === 'password'){
                return 'text'
            }else{
                return 'password'
            }
        })
      }

      const handleSubmit=async(event)=>{
        event.preventDefault();
        if(password !== confirmPassword){
            setStatusMessage('unmatched passwords')
            setTimeout(()=>setStatusMessage('_'),2500)
            return;
        } 
        setIsMasterPasswordCreated(true);
        const hashedPassword=await hashPassword(password);
        try{
            const userRef = ref(realtimeDb,`users/${user.uid}`);
            await update(userRef,{
                password:hashedPassword,
                hasMasterPassword:true,
            })
            handeSetIsNewGoogleAuthUser(false);
        }catch(e){
            console.error(e)
            setStatusMessage("error occured please try again");
            setTimeout(()=>setStatusMessage('_'),2500)
        }finally{
            setIsMasterPasswordCreated(false);
        }
      }

    return ( 
        <div className='overlaying'>
            <div className="add-password-dialog-div">
                <div className='info'>
                    <div className='icon'>
                    <FcGoogle/>
                    </div>
                    <div className='p-info'>
                    <p>Having chosen google signin, it is required to have a master password to continue with the application usage.</p>
                    <p>This is a one time procedure, so please create a convenient unique password.</p>
                    </div>                    
                </div>
                <div className='input' onSubmit={handleSubmit}>
                    <h2>Master password</h2>
                    <p>Input a convenient unique password</p>
                    <form>
                    <div className='pass' >
                        <input placeholder='Password' minLength={6} type={passType} required onChange={(e)=>setPassword(e.target.value)} name='password' value={password} className='c-input' maxLength={100} />
                        <FaBullseye className='eye' onClick={handlePassType} />
                    </div>
                    <div className='pass'>
                        <input placeholder='Confirm password' minLength={6} type={passType} required onChange={(e)=>setConfirmPassword(e.target.value)} name='confirmpassword' value={confirmPassword} className='c-input' maxLength={100} />
                        <FaBullseye className='eye' onClick={handlePassType} />
                    </div>
                    <SubmitButton text={"Submit"} state={isMasterPasswordCreated} />
                    </form>
                    <span>{statusMessage}</span>
                </div>
            </div>
        </div>
     );
}
 
export default AddPasswordDialog;