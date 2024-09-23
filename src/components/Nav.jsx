import { NavLink } from "react-router-dom";
import Logo from "../assets/Logo_F-E.svg";
import "../index.css";
import "../App.css"
import { MdOutlineHome } from "react-icons/md";
import { IoTrophyOutline } from "react-icons/io5";
import { MdOutlineGroups3 } from "react-icons/md";
import { BsPerson } from "react-icons/bs";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";

export default function Nav() {
return (
    <>
        <div className="nav flex flex-col gap-">
            <div className="flex items-center gap-1">
                <img src={Logo} alt="Logo formula E" className="w-3/4" />
                <button className="text-white text-3xl"><AiOutlineMenu/></button>
            </div>

            <nav className="text-azul-claro py-8 text-3xl pl-[30%]">
                <ul className="flex flex-col gap-3 ">
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
                        <NavLink className={'flex items-center gap-3'} to="/ranking">
                            <div>
                                <IoTrophyOutline />
                            </div>
                            <div>
                                    Ranking
                            </div>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink className={'flex items-center gap-3'} to="/teams">
                            <div>
                                <MdOutlineGroups3 />
                            </div>
                            <div>
                                    Teams
                            </div>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink className={'flex items-center gap-3'} to="/about">
                            <div>
                                <BsPerson />
                            </div>
                            <div>
                                    About
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
