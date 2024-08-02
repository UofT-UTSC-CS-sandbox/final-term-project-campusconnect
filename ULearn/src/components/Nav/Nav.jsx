import './Nav.css'
import React from 'react'
import { IoMdChatbubbles, IoMdRadioButtonOn  } from "react-icons/io";
import { MdHomeFilled } from "react-icons/md";
import { UserButton } from '@clerk/clerk-react'; 
import EditButtonNav from './EditButtonNav.jsx';
import { PiCalendarCheckFill } from "react-icons/pi";

const Nav = () => {
  return (
    <nav className='nav-wrapper'>
        <h1 style={{ fontSize: '20px'}}>ULearn</h1>
        <div className='nav-user-button'>
            <UserButton/>
        </div>
        <div className="profile-container">
            <a href="/homePage">
                <MdHomeFilled className='nav-icons'/>
            </a>
            <a href="/chatRoom">
                <IoMdChatbubbles className='nav-icons'/>
            </a>
            <a href="/recordings">
                <IoMdRadioButtonOn className='nav-icons'/>
            </a>
            <a href="/editTutorProfile">
                <EditButtonNav className='nav-icons'/>
            </a>
            <a href="/myAppointments">
                <PiCalendarCheckFill className='nav-icons' />
            </a>
        </div>
    </nav>
  )
}

export default Nav