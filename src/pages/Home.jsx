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

    function formatDate() {
        var d = new Date(),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();
    
        if (month.length < 2) 
            month = '0' + month;
        if (day.length < 2) 
            day = '0' + day;
    
        return [year, month, day].join('-');
    }

    const createPost = () => {
        const agora = new Date();

        const dia = String(agora.getDate()).padStart(2, '0');
        const mes = String(agora.getMonth() + 1).padStart(2, '0'); // Meses começam em 0
        const ano = String(agora.getFullYear());
        const hora = String(agora.getHours()).padStart(2, '0');
        const minuto = String(agora.getMinutes()).padStart(2, '0');

        const dataHoraInt = parseInt(`${dia}${mes}${ano}${hora}${minuto}`, 10);
        const newPost = { id: dataHoraInt,titulo: null, conteudo: textPost, usuario_id: user.id, data: formatDate(), grupo_id: null }
        const savedPosts = localStorage.getItem('posts');
        const postsArray = savedPosts ? JSON.parse(savedPosts) : [];

        postsArray.push(newPost);
        localStorage.setItem('posts', JSON.stringify(postsArray));
        setTextPost('')
    };

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
            {user && (
                <>
                    <input
                        className='bg-transparent border-2 rounded-full px-6 py-2 border-white'
                        value={textPost}
                        onChange={(e) => setTextPost(e.target.value)}
                    />
                    <button onClick={createPost} className='self-end m-10 p-4 w-auto bg-azul-marinho rounded-full'>Novo Post</button>
                </>
            )}
        </main>
    );
}