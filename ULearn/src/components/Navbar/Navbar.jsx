import React, {useState} from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { Link } from "react-router-dom";
import { NavbarData } from "./NavbarData";
import "./navbar.css"
import {IconContext} from 'react-icons';

function Navbar(){
    const [sidebar, setSidebar] = useState(false);
    const showSidebar = () => setSidebar(!sidebar);
    return (
        <>
        <IconContext.Provider value={{ color: "undefined" }}>
            <div className="navbar">
            <Link to="#" className="menu-bars">
                <RxHamburgerMenu onClick={showSidebar} />
            </Link>
            </div>
            <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
            <ul className="nav-menu-items" onClick={showSidebar}>
                <li className="navbar-toggle">
                <Link to="#" className="menu-bars">
                    <RxHamburgerMenu />
                </Link>
                </li>
                {NavbarData.map((item, index) => {
                return (
                    <li key={index} className={item.classname}>
                    <Link to={item.path}>
                        {item.icon}
                        <span>{item.title}</span>
                    </Link>
                    </li>
                );
                })}
            </ul>
            </nav>
        </IconContext.Provider>
        </>
    )
}

export default Navbar;