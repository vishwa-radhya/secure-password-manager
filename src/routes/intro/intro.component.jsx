import './intro.styles.scss';
import IntroImg from '../../assets/intro-img.jpg';
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from 'react-router-dom';
import AppIcon from '../../assets/password-svgrepo-com.svg';
import ImgLoader from '../../components/img-loader/img-loader.component';
import { signInWithGooglePopup } from '../../utils/firebase/firebase';
const Intro = () => {
    const router = useNavigate();
    return ( 
        <div className='intro-div'>
            <div className='img'>
                <ImgLoader imgSrc={IntroImg} ls={"50px"}   />
            </div>
            <div className='content'>
                <div className='logo'>
                <img src={AppIcon} width={"7%"} />
                <span>Secure Password Manager</span>
                </div>
                <h1>Manage Passwords From Anywhere</h1>
                <p>Keep your passwords in a secure private vault-and simply access them with one click from all your devices.</p>
                <div className='btns'>
                    <button onClick={()=>router('create-user')}>Get Started</button>
                    <button className='google' onClick={signInWithGooglePopup}>
                        <FcGoogle/>
                    </button>
                </div>
                <p className='have-acc'>i have an account! <span onClick={()=>router('auth')}>Login</span></p>
            </div>
        </div>
     );
}
 
export default Intro;