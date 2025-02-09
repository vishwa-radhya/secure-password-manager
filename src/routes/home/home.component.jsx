import './home.styles.scss';
import userPic from '../../assets/user-account-person-avatar-svgrepo-com.svg';
import { useUserAuthContext } from '../../contexts/user-auth.context';
import { FaChevronRight,FaKey } from "react-icons/fa6";
import { RiAiGenerate,RiLockPasswordLine } from "react-icons/ri";
import { MdOutlineAssessment,MdCategory  } from "react-icons/md";
import { CgDatabase } from "react-icons/cg";

const nameArray=['Generate passwords','Check password strength','Access Methods','Add passwords'];
const iconArray=[RiAiGenerate,MdOutlineAssessment,RiLockPasswordLine,CgDatabase];

const Home = () => {
    const {user}=useUserAuthContext(); 

    return ( 
        <div className='home-div'>
            <div className='header'>
                <p>Welcome back,</p>
                <img src={userPic} />
                <h1>{"Figerland shanks"}</h1>
            </div>
            <div className='main'>
                <div className='parent'>
                <div>
                    <div className='head-next'>
                        <p>Overview</p>
                        <FaChevronRight/>
                    </div>
                    <div className='overview'>
                    <div>
                    <FaKey/>
                    15 Entries
                    </div>
                    <div>
                    <MdCategory />
                    5 Categories
                    </div>
                    </div>
                </div>
                <div>
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
                    return <div key={`app-tile-spm-${index}`}>
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