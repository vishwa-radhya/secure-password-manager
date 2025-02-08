import './create-user.styles.scss';
import AppIcon from '../../assets/password-svgrepo-com.svg';
import { FcGoogle } from "react-icons/fc";
import { useState } from 'react';
import { FaBullseye } from "react-icons/fa";
import SubmitButton from '../../components/submit-button/submit-button.component';
import { signInWithGooglePopup } from '../../utils/firebase/firebase';
import { createUserFromEmailAndPassword } from '../../utils/firebase/firebase';
const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

const CreateUser = () => {

      const [formFields, setFormFields] = useState(defaultFormFields);
      const { displayName, email, password, confirmPassword } = formFields;
      const [passType,setPassType]=useState('password');
      const [isUserCreated,setIsUserCreated]=useState(false);

      const resetFormFields = () => {
        setFormFields(defaultFormFields);
      };

      const handleSubmit = async (event) => {
        event.preventDefault();
        if (password !== confirmPassword) {
          alert('passwords do not match');
          return;
        }
        console.log(formFields)
        try {
          resetFormFields();
        } catch (error) {
          if (error.code === 'auth/email-already-in-use') {
            alert('Cannot create user, email already in use');
          } else {
            console.log('user creation encountered an error', error);
          }
        }
      };
    
      const handleChange = (event) => {
        const { name, value } = event.target;
        setFormFields({ ...formFields, [name]: value });
      };

      const handlePassType=()=>{
        setPassType(prev=>{
            if(prev === 'password'){
                return 'text'
            }else{
                return 'password'
            }
        })
      }

    return ( 
        <div className='create-user-div'>
            <div className='i-space c-i-space'>
                <div>
                    <img src={AppIcon} />
                    <span>Secure Password manager</span>
                </div>
                <div>
                    <p>Get </p>
                    <p>Everything</p>
                    <p>You Want</p>
                </div>
            </div>
            <div className='main c-i-main'>
                <div className='head'>
                    <h1>{"Don't"} have an account ? </h1>
                    <p>Sign up with your email and password</p>
                </div>
                <form onSubmit={handleSubmit}>
                  <input placeholder='Display Name' type='text' required onChange={handleChange} name='displayName' value={displayName} className='c-input' spellCheck={false} />
                  <input placeholder='Email' type='email' required onChange={handleChange} name='email' value={email} className='c-input' />
                  <div className='pass' >
                  <input placeholder='Password' minLength={4} type={passType} required onChange={handleChange} name='password' value={password} className='c-input' />
                  <FaBullseye className='eye' onClick={handlePassType} />
                  </div>
                  <div className='pass'>
                  <input placeholder='Confirm Password' minLength={4} type={passType} required onChange={handleChange} name='confirmPassword' value={confirmPassword} className='c-input' />
                  <FaBullseye className='eye' onClick={handlePassType} />
                  </div>
                  <SubmitButton text={'Sign Up'} state={isUserCreated} size={"28px"} />
              </form>
                <div className='g-sign'>
                <button onClick={signInWithGooglePopup}><FcGoogle className='svg' /> Sign In with Google</button>
                </div>
            </div>
        </div>
     );
}
 
export default CreateUser;