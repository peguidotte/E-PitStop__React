import '../../index.css';
import '../../App.css';
import { Outlet } from 'react-router-dom';
import HomeOptions from '../../components/HomeOptions.jsx';

export default function Home() {
    return (
        <main className='outlet flex flex-col h-[95vh]'>
            <nav className='p-10'>
            <ul className='flex justify-between'>
                <li>For you</li>
                <li>Following</li>
                <li>Teams</li>
                <li>Athletes</li>
                <li>Communities</li>
            </ul>
        </nav> 
            <div className='flex-grow'>
                <Outlet/>
            </div>
            <HomeOptions/>
        </main>
    );
}