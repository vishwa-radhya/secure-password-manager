import './home.styles.scss';
import userPic from '../../assets/user-account-person-avatar-svgrepo-com.svg';
import { useUserAuthContext } from '../../contexts/user-auth.context';
import { FaChevronRight,FaStar } from "react-icons/fa6";
import { RiAiGenerate,RiLockPasswordLine } from "react-icons/ri";
import { MdOutlineAssessment } from "react-icons/md";
import { CgDatabase } from "react-icons/cg";
import { useNavigate } from 'react-router-dom';
import { FaThList } from "react-icons/fa";

const nameArray=['Generate passwords','Check password strength','Access Methods','Add passwords'];
const iconArray=[RiAiGenerate,MdOutlineAssessment,RiLockPasswordLine,CgDatabase];

const Home = () => {
    const {user}=useUserAuthContext(); 
    const router = useNavigate();
    
    return ( 
        <div className='home-div'>
            <div className='header'>
                <p>Welcome back,</p>
                <img src={userPic} />
                <h1>{user?.displayName ?? "Figerland shanks"}</h1>
            </div>
            <div className='main'>
                <div className='parent'>
                <div onClick={()=>router('all-passwords')} className='bs'>
                    <div className='head-next'>
                        <p>All passwords</p>
                        <FaChevronRight/>
                    </div>
                    <div className='overview'>
                    <div>
                    <FaThList/>
                    15 Entries
                    </div>
                    <div>
                    <FaStar />
                    5 Favourites
                    </div>
                    </div>
                </div>
                <div onClick={()=>router('password-health')} className='bs'>
                <div className='head-next'>
                        <p>Password Health</p>
                        <FaChevronRight/>
                    </div>
                    <div className='colors'>
                        <div className='green'></div>
                        <div className='yellow'></div>
                        <div className='red'></div>
                    </div>
                </div>
                </div>
                <div className='blocks'>
                {iconArray.map((Icon,index)=>{
                    return <div key={`app-tile-spm-${index}`} className='bs' onClick={()=>router(`${nameArray[index].replace(/\s/g,'-').toLowerCase()}`)}>
                        <div>
                            <Icon className='icon' />
                        </div>
                        <div>{nameArray[index]}</div>
                        <div className='angle'><FaChevronRight/></div>
                    </div>
                })}    
                </div>
            </div>
        </div>
     );
}
 
export default Home;