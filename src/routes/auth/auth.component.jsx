import './auth.styles.scss';
import AppIcon from '../../assets/password-svgrepo-com.svg';
import { useState } from 'react';
import { FaBullseye } from "react-icons/fa";
import SubmitButton from '../../components/submit-button/submit-button.component';
import { FcGoogle } from "react-icons/fc";
import { signInWithGooglePopup } from '../../utils/firebase/firebase';

const defaultFormFields = {
    email: '',
    password: '',
};

const Auth = () => {

    const [formFields, setFormFields] = useState(defaultFormFields);
    const {  email, password } = formFields;
    const [passType,setPassType]=useState('password');
    const [isUserAuthenticated,setIsUserAuthenticated]=useState(false);

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        // if (password !== confirmPassword) {
        //   alert('passwords do not match');
        //   return;
        // }
    
        try {
          resetFormFields();
        } catch (error) {
          if (error.code === 'auth/email-already-in-use') {
            alert('Cannot create user, email already in use');
          } else {
            console.log('user creation encountered an error', error);
          }
        // }
      };
    }

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
        <div className='auth-div'>
            <div className='i-space c-i-space'>
                <div>
                <img src={AppIcon} />
                <span>Secure Password manager</span>
                </div>
            <div>
                <p>One</p>
                <p>Thirteen</p>
                <p>Nineteen Nine</p>
            </div>
            </div>
            <div className='main c-i-main'>
            <div className='head'>
                    <h1>Sign in to your account  </h1>
                    <p>Sign in with your email and password</p>
            </div>
                <form onSubmit={handleSubmit}>
                  <input placeholder='Email' type='email' required onChange={handleChange} name='email' value={email} className='c-input' />
                  <div className='pass'>
                  <input placeholder='Password' minLength={4} type={passType} required onChange={handleChange} name='password' value={password} className='c-input' />
                  <FaBullseye className='eye' onClick={handlePassType} />
                  </div>
                  <SubmitButton text={'Sign In'} state={isUserAuthenticated} size={"25px"} />
                </form>
                <div className='g-sign'>
                  <button onClick={signInWithGooglePopup}><FcGoogle className='svg' /> Sign In with Google</button>
                </div>
            </div>
        </div>
     );
}
 
export default Auth;