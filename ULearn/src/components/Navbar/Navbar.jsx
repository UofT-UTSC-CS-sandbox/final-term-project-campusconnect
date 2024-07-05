import React, {useState} from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { Link } from "react-router-dom";
import { NavbarData } from "./NavbarData";

function Navbar(){
    const [sidebar, setSidebar] = useState(true);
    const toggleSidebar = () => setSidebar(!sidebar)
    return (
        <>
            <div classname="navbar">
                <Link to="#" classname='burgermenu'>
                    <RxHamburgerMenu onClick={toggleSidebar}></RxHamburgerMenu>
                </Link>
            </div>
            <nav classname={sidebar ? 'nav-menu active' : 'nav-menu'}>
                <ul className="nav-menu-items">
                    <li className="navbar-toggle">
                        <Link to="#" className="burgermenu">
                            <RxHamburgerMenu></RxHamburgerMenu>
                        </Link>
                    </li>
                    {NavbarData.map((page, index) => {
                        return(
                            <li key={index} className={page.classname}>
                                <Link to={page.path}>
                                    {page.icon}
                                    <span>{page.title}</span>
                                </Link>
                            </li>
                        )
                    })}
                </ul>
            </nav>
        </>
    )
}

export default Navbar;