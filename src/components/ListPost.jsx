import { useEffect, useState } from 'react';
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import data from '../assets/postsUser.json';

function ListPost({ filteredPosts }) {
    const [usuarios, setUsuarios] = useState([]);
    const [likedPosts, setLikedPosts] = useState([]);
    const [posts, setPosts] = useState([]);
    const user = JSON.parse(localStorage.getItem("currentUser"));
    const [textPost, setTextPost] = useState('')

    useEffect(() => {
        setUsuarios(data.usuarios);
        const initialPosts = [...filteredPosts];

        const savedPosts = localStorage.getItem('posts');
        if (savedPosts) {
            const postsArray = JSON.parse(savedPosts);
            initialPosts.push(...postsArray);
        }

        setPosts(initialPosts); // Define os posts combinados

        const savedLikes = localStorage.getItem("likes");
        if (savedLikes) {
            setLikedPosts(savedLikes.split(';'));
        }
    }, [textPost]);

    function likePost(postId) {
        const newLikedPosts = likedPosts.includes(postId.toString())
            ? likedPosts.filter(id => id !== postId.toString())
            : [...likedPosts, postId.toString()];

        localStorage.setItem("likes", newLikedPosts.join(';'));
        setLikedPosts(newLikedPosts);
    }


    const createPost = () => {
        const agora = new Date();
        const d = new Date();
        const dia = String(agora.getDate()).padStart(2, '0');
        const mes = String(agora.getMonth() + 1).padStart(2, '0'); // Meses começam em 0
        const ano = String(agora.getFullYear());
        const hora = String(agora.getHours()).padStart(2, '0');
        const minuto = String(agora.getMinutes()).padStart(2, '0');

        const dataHoraInt = Number.parseInt(`${dia}${mes}${ano}${hora}${minuto}`, 10);
        const newPost = { id: dataHoraInt, titulo: null, conteudo: textPost, usuario_id: user.id, data: d.getFullYear().toString() + "-" + ((d.getMonth() + 1).toString().length == 2 ? (d.getMonth() + 1).toString() : "0" + (d.getMonth() + 1).toString()) + "-" + (d.getDate().toString().length == 2 ? d.getDate().toString() : "0" + d.getDate().toString()) + " " + (d.getHours().toString().length == 2 ? d.getHours().toString() : "0" + d.getHours().toString()) + ":" + ((parseInt(d.getMinutes() / 5) * 5).toString().length == 2 ? (parseInt(d.getMinutes() / 5) * 5).toString() : "0" + (parseInt(d.getMinutes() / 5) * 5).toString()) + ":00", grupo_id: null }
        const savedPosts = localStorage.getItem('posts');
        const postsArray = savedPosts ? JSON.parse(savedPosts) : [];

        postsArray.push(newPost);
        localStorage.setItem('posts', JSON.stringify(postsArray));
        //posts.push(...newPost)
        setTextPost('')
    };


    return (
        <>
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
                                <p className='text-sm text-gray-800 ml-4'>{post.data.split(' ')[0]}</p>
                            </div>
                            <p className="mt-2 text-gray-700">{post.conteudo}</p>
                        </li>
                    );
                })}
            </ul>
            {user && (
                <div className='flex flex-row justify-between items-center'>
                    <input
                        className='bg-transparent border-2 rounded-full px-6 py-2 border-white h-14 flex-1'
                        value={textPost}
                        onChange={(e) => setTextPost(e.target.value)}
                    />
                    <button type='button' onClick={createPost} className='self-end m-10 p-4 w-auto bg-azul-marinho rounded-full'>Novo Post</button>
                </div>
            )}
        </>
    );
}

export default ListPost;
