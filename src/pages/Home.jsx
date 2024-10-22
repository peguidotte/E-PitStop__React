import { Outlet, NavLink, useLocation } from 'react-router-dom';
import '../App.css';
import '../index.css';
import { useEffect, useState } from 'react';

export default function Home() {
    const user = JSON.parse(localStorage.getItem("currentUser"))
    const [textPost, setTextPost] = useState('')
    const location = useLocation();

    useEffect(() => {
        const savedPosts = localStorage.getItem('posts');
        if (savedPosts) {
            const postsArray = JSON.parse(savedPosts);
            console.log(postsArray);
            postsArray.forEach(post => {
                console.log(post);
            });
        }
    }, [])

    const homeItens = [
        { to: '/', label: 'For You' },
        { to: 'home-following', label: 'Following' },
        { to: 'home-teams', label: 'Teams' },
        { to: 'home-athletes', label: 'Athletes' },
        { to: 'home-communities', label: 'Communities' },
    ]

    const isHomeActive = location.pathname === '/' || location.pathname.startsWith('/home-');

    return (
        <main className='outlet flex flex-col h-full lg:h-[95%]'>
            <nav className='mb-5 md:p-5 lg:py-8 lg:px-12 overflow-auto'>
                <ul className='flex justify-between gap-4 text-xs md:text-xl lg:text-xl'>
                    {homeItens.map((item, index) => (
                        <li key={index}>
                            <NavLink
                                className={({ isActive }) => (isActive && item.to !== '/') || (item.to === '/' && location.pathname === '/')
                                    ? "flex items-center gap-3 md:-translate-y-1 scale-110 font-semibold  "
                                    : "flex items-center gap-3"}
                                to={item.to}
                                end={item.to === '/'}
                            >
                                <p className='text-nowrap'>{item.label}</p>
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </nav>
            <div className='flex-grow overflow-auto'>
                <Outlet />
            </div>
        </main>
    );
}