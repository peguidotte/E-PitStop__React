import { NavLink, useLocation } from "react-router-dom";

import Logo from "../assets/Logo_F-E.svg";
import "../index.css";
import "../App.css";

import { MdOutlineHome, MdOutlineSearch } from "react-icons/md";
import { BsPerson } from "react-icons/bs";
import { RxVideo } from "react-icons/rx";
import { CiChat1 } from "react-icons/ci";

const menuItems = [
    { to: "/", icon: <MdOutlineHome />, label: "Home" },
    { to: "stream", icon: <RxVideo />, label: "Stream" },
    { to: "search", icon: <MdOutlineSearch />, label: "Search" },
    { to: "chat", icon: <CiChat1 />, label: "Chat" },
    { to: "profile", icon: <BsPerson />, label: "Profile" }
];

export default function Menu() {
    const location = useLocation();
    const isHomeActive = location.pathname === '/' || location.pathname.startsWith('/home-');

    return (
        <div className="nav flex lg:flex-col">
            <header className="hidden lg:flex justify-center">
                <img src={Logo} alt="Logo formula E" className="w-3/4" />
            </header>

            <nav className="text-azul-claro py-8 w-full text-3xl lg:text-2xl xl:text-4xl lg:pl-[10%] xl:pl-[15%] 2xl:pl-[20%] flex-grow ">
                <ul className="flex justify-between mx-3 md:mx-8 lg:flex-col lg:gap-5 xl:gap-14 ">
                    {menuItems.map((item, index) => (
                        <li key={index}>
                            <NavLink
                                className={({ isActive }) => (isActive || (item.to === '/' && isHomeActive))  ? "flex items-center gap-3 -translate-y-1 scale-125 lg:-translate-y-0 lg:translate-x-3 " 
                                : "flex items-center gap-3"}
                                to={item.to}
                            >
                                <div>{item.icon}</div>
                                <div className="hidden lg:block">{item.label}</div>
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </nav>


        </div>
    );
}