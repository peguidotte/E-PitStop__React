import { useEffect, useState } from 'react';
import data from '../../assets/postsUser.json';
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import ListPost from '../../components/ListPost';

function Foryou() {
    const [usuarios, setUsuarios] = useState([]);
    const [likedPosts, setLikedPosts] = useState([]);
    const [posts, setPosts] = useState([]);
    const user = JSON.parse(localStorage.getItem("currentUser"));
    const [textPost, setTextPost] = useState('')

    useEffect(() => {
        setUsuarios(data.usuarios);
        const initialPosts = [...data.posts];

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
        <div className="max-w-3xl mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Posts for you</h1>
            <ListPost filteredPosts={data.posts} />
        </div>
    );
}

export default Foryou;
