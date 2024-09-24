import { NavLink } from "react-router-dom";

import Logo from "../assets/Logo_F-E.svg";
import "../index.css";
import "../App.css";
import '../components/Menu.css';

import { MdOutlineHome, MdOutlineGroups3  } from "react-icons/md";
import { IoTrophyOutline } from "react-icons/io5";
import { BsPerson } from "react-icons/bs";
import { RxVideo } from "react-icons/rx";
import { CiChat1 } from "react-icons/ci";

export default function Menu() {

    return (
        <>  
            <div className="nav flex lg:flex-col">
                <header className="hidden lg:flex justify-center">
                    <img src={Logo} alt="Logo formula E" className="w-3/4" />
                </header>

                <nav className="text-azul-claro py-8 w-full text-3xl lg:text-2xl xl:text-3xl lg:pl-[10%] xl:pl-[25%]">
                    <ul className="flex justify-between mx-3 md:mx-8 lg:flex-col lg:gap-5 xl:gap-8 ">
                        <li>
                            <NavLink className={'flex items-center gap-3'} to="/">
                                <div>
                                    <MdOutlineHome />
                                </div>
                                <div className="hidden lg:block">
                                    Home
                                </div>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink className={'flex items-center gap-3'} to="ranking">
                                <div>
                                    <IoTrophyOutline />
                                </div>
                                <div className="hidden lg:block">
                                    Ranking
                                </div>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink className={'flex items-center gap-3'} to="teams">
                                <div>
                                    <MdOutlineGroups3 />
                                </div>
                                <div className="hidden lg:block">
                                    Teams
                                </div>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink className={'flex items-center gap-3'} to="stream">
                                <div>
                                    <RxVideo />
                                </div>
                                <div className="hidden lg:block">
                                    Stream
                                </div>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink className={'flex items-center gap-3'} to="chat">
                                <div>
                                    <CiChat1 />
                                </div>
                                <div className="hidden lg:block">
                                    Chat
                                </div>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink className={'flex items-center gap-3'} to="profile">
                                <div>
                                    <BsPerson />
                                </div>
                                <div className="hidden lg:block">
                                    Profile
                                </div>
                            </NavLink>
                        </li>
                    </ul>
                </nav>

                <div className="hidden lg:block flex-grow overflow-auto">
                    <h1 className="text-azul-claro">Pequenas info/perfil</h1>
                    <p>Informações básicas do perfil aqui</p>
                </div>
            </div>
        </>
    );
}
