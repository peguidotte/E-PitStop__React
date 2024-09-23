import { NavLink } from "react-router-dom";
import IconePost from '../assets/Icon_F-E.svg';
import { RxVideo } from "react-icons/rx";
import { CiChat1 } from "react-icons/ci";

function HomeOptions() {
    return (
        <nav>
            <ul className='flex justify-evenly items-center'>
                <li>
                    <NavLink to='/'><img src={IconePost} className='w-10' /></NavLink>
                </li>
                <li>
                    <NavLink to='/stream'><RxVideo className='text-azul-marinho text-5xl'/></NavLink>
                </li>
                <li>
                    <NavLink to='/chat'><CiChat1 className='text-azul-marinho text-5xl'/></NavLink>
                </li>
            </ul>
        </nav>
    )
}

export default HomeOptions;
