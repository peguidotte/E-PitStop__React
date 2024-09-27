import { Outlet, NavLink } from 'react-router-dom';
import '../App.css';
import '../index.css';
import { useEffect, useState } from 'react';

export default function Home() {
    const user = JSON.parse(localStorage.getItem("currentUser"))
    const [textPost, setTextPost] = useState('')

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


    return (
        <main className='outlet flex flex-col h-full'>
            <nav className='mb-5 md:p-5 lg:py-8 lg:px-12'>
                <ul className='flex justify-between text-xs md:text-xl lg:text-xl'>
                    <li><NavLink to="/">For you</NavLink></li>
                    <li><NavLink to="home-following">Following</NavLink></li>
                    <li><NavLink to="home-teams">Teams</NavLink></li>
                    <li><NavLink to="home-athletes">Athletes</NavLink></li>
                    <li><NavLink to="home-communities">Communities</NavLink></li>
                </ul>
            </nav>
            <div className='flex-grow overflow-auto'>
                <Outlet />
            </div>
        </main>
    );
}