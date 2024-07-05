import React from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { MdDashboard } from "react-icons/md";
import { IoMdChatboxes } from "react-icons/io";


export const NavbarData = [
    {
        title: 'Dashboard',
        path:'/homePage',
        icon: <MdDashboard />,
        classname: 'nav-text'
    },
    {
        title: 'Messages',
        path:'/chatRoom',
        icon: <IoMdChatboxes />,
        classname: 'nav-text'
    },
]