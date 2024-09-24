import { NavLink } from "react-router-dom";
import { useState } from 'react';

import Logo from "../assets/Logo_F-E.svg";
import "../index.css";
import "../App.css";
import '../components/Menu.css';

import { MdOutlineHome, MdOutlineGroups3  } from "react-icons/md";
import { IoTrophyOutline } from "react-icons/io5";
import { BsPerson } from "react-icons/bs";
import { AiOutlineMenu } from "react-icons/ai";
import { RiMenuFold2Line } from "react-icons/ri";
import { RxVideo } from "react-icons/rx";
import { CiChat1 } from "react-icons/ci";

export default function Menu() {
    const [isHidden, setIsHidden] = useState(false);

    const toggleHidden = () => {
        setIsHidden(function (prev) {
            return !prev;
        });
    };

    return (
        <>  
            <div className={`fade ${isHidden ? 'hidden' : ''} flex items-start justify-center m-[5px] `}>
                <header className="flex items-center gap-1">
                    <img src={Logo} alt="Logo formula E" className="w-3/4"/>
                    <button className="text-white text-3xl" onClick={toggleHidden}><AiOutlineMenu /></button>
                </header>
            </div>

            <div className={`fade ${isHidden ? '' : 'hidden'} nav flex flex-col`}>
                <header className="flex items-center gap-1">
                    <img src={Logo} alt="Logo formula E" className="w-3/4" />
                    <button className="text-white text-3xl" onClick={toggleHidden}><RiMenuFold2Line /></button>
                </header>

                <nav className="text-azul-claro py-8 xl:text-3xl lg:pl-[30%]">
                    <ul className="flex flex-col gap-4 ">
                        <li>
                            <NavLink className={'flex items-center gap-3'} to="/">
                                <div>
                                    <MdOutlineHome />
                                </div>
                                <div>
                                    Home
                                </div>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink className={'flex items-center gap-3'} to="ranking">
                                <div>
                                    <IoTrophyOutline />
                                </div>
                                <div>
                                    Ranking
                                </div>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink className={'flex items-center gap-3'} to="teams">
                                <div>
                                    <MdOutlineGroups3 />
                                </div>
                                <div>
                                    Teams
                                </div>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink className={'flex items-center gap-3'} to="about">
                                <div>
                                    <BsPerson />
                                </div>
                                <div>
                                    About
                                </div>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink className={'flex items-center gap-3'} to="stream">
                                <div>
                                    <RxVideo />
                                </div>
                                <div>
                                    Stream
                                </div>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink className={'flex items-center gap-3'} to="chat">
                                <div>
                                    <CiChat1 />
                                </div>
                                <div>
                                    Chat
                                </div>
                            </NavLink>
                        </li>
                    </ul>
                </nav>

                <div className="flex-grow overflow-auto">
                    <h1 className="text-azul-claro">Meu perfil</h1>
                    <p>Informações do Perfil vão aparecer aqui após criar conta</p>
                </div>
            </div>
        </>
    );
}
