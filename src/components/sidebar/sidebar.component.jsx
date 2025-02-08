import { useEffect, useRef, useState } from 'react';
import './sidebar.styles.scss';
import { HiBars2 } from "react-icons/hi2";
import ViteSvg from '../../../public/vite.svg';
import { FaHouse } from 'react-icons/fa6';

const Sidebar = () => {

    const [isOpen,setIsOpen]=useState(false);
    const sidebarRef = useRef(null);
    const menubarRef = useRef(null);
    // const [theme,setTheme]=useState(true);

    // useEffect(()=>{
    //     document.body.className=theme ? 'dark-theme' : 'light-theme';
    // },[theme]);

    useEffect(()=>{
        if(isOpen){
            const handleClickOutside=(event)=>{
                if(menubarRef.current && !menubarRef.current.contains(event.target) && sidebarRef.current && !sidebarRef.current.contains(event.target)){
                    setIsOpen(false);
                }
            }
            document.addEventListener('click',handleClickOutside);
            return ()=>document.removeEventListener('click',handleClickOutside);
        }
    },[isOpen])

    return ( 
        <div className={`${isOpen ? "overlaying" : ""}`}>
        <div className='side-bar-div' ref={sidebarRef}>
           <button className='menu-btn' ref={menubarRef} onClick={()=>setIsOpen(!isOpen)}>
            <HiBars2/>
            </button>
            <div className={`mainbar ${isOpen ? "open" : ""}`}>
                <div className='header'>
                    <img src={ViteSvg}  />
                    <h2>My App</h2>
                </div>
                <nav>
                    <div>
                        <FaHouse/>
                        <p>Home</p>
                    </div>
                    <div>
                        <FaHouse/>
                        <p>Check Strength</p>
                    </div>
                    <div>
                        <FaHouse/>
                        <p>Store Password</p>
                    </div>
                    <div>
                        <FaHouse/>
                        <p>User</p>
                    </div>
                </nav>
            </div>
            
        </div>
         </div>
     );
}
 
export default Sidebar;
