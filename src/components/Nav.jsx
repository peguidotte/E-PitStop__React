import { NavLink } from "react-router-dom";
import Logo from "../assets/Logo_F-E.svg";
import "../index.css";
import { MdOutlineHome } from "react-icons/md";
import { IoTrophyOutline } from "react-icons/io5";
import { MdOutlineGroups3 } from "react-icons/md";
import { BsPerson } from "react-icons/bs";

export default function Nav() {
return (
    <>
        <div className="flex flex-col g-2 w-[30%] h-full">
            <div className="bg-black rounded-md pr-5 flex gap-1">
                <img src={Logo} alt="Logo formula E" className="w-3/4" />
                <button className="text-white">Icon menu</button>
            </div>

            <nav className="text-azul-claro text-2xl bg-black rounded-md pl-[35%]">
                <ul className="flex flex-col gap-2 ">
                    <li>
                        <NavLink className={'flex items-center'} to="/">
                            <div>
                                <MdOutlineHome />
                            </div>
                            <div>
                                    Home
                            </div>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink className={'flex items-center'} to="/Ranking">
                            <div>
                                <IoTrophyOutline />
                            </div>
                            <div>
                                    Ranking
                            </div>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink className={'flex items-center'} to="/Teams">
                            <div>
                                <MdOutlineGroups3 />
                            </div>
                            <div>
                                    Teams
                            </div>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink className={'flex items-center'} to="/About">
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

            <div>
                <h1 className="text-azul-claro">Meu perfil</h1>
                <p>Informações do Perfil vão aparecer aqui após criar conta</p>
            </div>
        </div>
    </>
);
}
