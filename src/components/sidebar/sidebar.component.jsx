import { useEffect, useRef, useState } from 'react';
import './sidebar.styles.scss';
import { HiBars2 } from "react-icons/hi2";
import ViteSvg from '../../assets/password-svgrepo-com.svg';
import { FaHouse } from 'react-icons/fa6';
import { FaUserAstronaut } from "react-icons/fa6";
import { Outlet } from 'react-router-dom';

const Sidebar = () => {

    const [isOpen,setIsOpen]=useState(false);
    const sidebarRef = useRef(null);
    const menubarRef = useRef(null);

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
            <div className='menu'>
           <button className='menu-btn' ref={menubarRef} onClick={()=>setIsOpen(!isOpen)}>
            <HiBars2/>
            </button>
            <div className='user-astro'>
                <FaUserAstronaut/>
            </div>
            </div>
            <div className={`mainbar ${isOpen ? "open" : ""}`}>
                <div className='header'>
                    <img src={ViteSvg}  />
                    <h2>SPM</h2>
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
            <Outlet/>
         </div>
     );
}
 
export default Sidebar;
