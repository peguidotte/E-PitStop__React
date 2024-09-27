import { useEffect, useState } from 'react';
import data from '../../assets/postsUser.json';
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";

function Foryou() {
    const [usuarios, setUsuarios] = useState([]);
    const [likedPosts, setLikedPosts] = useState([]);
    const [posts, setPosts] = useState([]);
    const user = JSON.parse(localStorage.getItem("currentUser"));
    const [textPost, setTextPost] = useState('');

    useEffect(() => {
        setUsuarios(data.usuarios);
        const initialPosts = [...data.posts];

        const savedPosts = localStorage.getItem('posts');
        if (savedPosts) {
            const postsArray = JSON.parse(savedPosts);
            // Juntando os posts do Local Storage com os posts do JSON
            initialPosts.push(...postsArray);
        }
        
        setPosts(initialPosts); // Define os posts combinados

        const savedLikes = localStorage.getItem("likes");
        if (savedLikes) {
            setLikedPosts(savedLikes.split(';'));
        }
    }, []);

    function likePost(postId) {
        const newLikedPosts = likedPosts.includes(postId.toString())
            ? likedPosts.filter(id => id !== postId.toString())
            : [...likedPosts, postId.toString()];

        localStorage.setItem("likes", newLikedPosts.join(';'));
        setLikedPosts(newLikedPosts);
    }

    return (
        <div className="max-w-3xl mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Posts for you</h1>
            <ul>
                {posts.sort((a, b) => new Date(b.data) - new Date(a.data)).map(post => {
                    const user = usuarios.find(x => x.id === post.usuario_id);
                    return (
                        <li key={post.id} className="mb-6 p-4 border rounded-lg shadow-md bg-white relative">
                            <button 
                                type='button'
                                className='text-black font-md absolute right-2 top-2'
                                onClick={() => likePost(post.id)}
                            >   
                                {likedPosts.includes(post.id.toString()) ? (
                                    <FaHeart size={25} color='#ff0000' />
                                ) : (
                                    <CiHeart size={25} />
                                )}
                            </button>
                            <div className='flex flex-row items-end justify-start'>
                                <h2 className="text-xl text-gray-800 font-semibold">{user?.nome || "Usuário Desconhecido"}</h2>
                                <p className='text-sm text-gray-800 ml-4'>{post.data}</p>
                            </div>                                
                            <p className="mt-2 text-gray-700">{post.conteudo}</p>                                
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}

export default Foryou;
