import './Nav.css'
import React from 'react'
import { IoMdChatbubbles, IoMdRadioButtonOn  } from "react-icons/io";
import { MdPerson, MdHomeFilled } from "react-icons/md";
import { UserButton, useUser } from '@clerk/clerk-react'; 
import EditButtonNav from './EditButtonNav.jsx';

const Nav = () => {
  return (
    <nav className='nav-wrapper'>
        <UserButton/>
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
            <a href="#">
                <MdPerson className='nav-icons'/>
            </a>
            <a href="/editTutorProfile">
                <EditButtonNav />
            </a>
        </div>
    </nav>
  )
}

export default Nav