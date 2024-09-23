import { Outlet, NavLink } from 'react-router-dom';
import '../App.css';
import '../index.css';

export default function Home() {
    return (
        <main className='outlet flex flex-col h-[95vh]'>
            <nav className='p-10'>
                <ul className='flex justify-between'>
                    <li><NavLink to="/">For you</NavLink></li>
                    <li><NavLink to="home-following">Following</NavLink></li>
                    <li><NavLink to="home-teams">Teams</NavLink></li>
                    <li><NavLink to="home-athletes">Athletes</NavLink></li>
                    <li><NavLink to="home-communities">Communities</NavLink></li>
                </ul>
            </nav>
            <div className='flex-grow'>
                <Outlet />
            </div>
        </main>
    );
}