import './Nav.css'
import React from 'react'
import { IoMdChatbubbles } from "react-icons/io";
import { MdPerson, MdHomeFilled } from "react-icons/md";
import { UserButton, useUser } from '@clerk/clerk-react'; 

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
            <a href="#">
                <MdPerson className='nav-icons'/>
            </a>
        </div>
    </nav>
  )
}

export default Nav