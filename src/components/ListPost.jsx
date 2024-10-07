import { useEffect, useState } from "react";
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import data from "../assets/postsUser.json";
import PropTypes from "prop-types";

function ListPost({ filteredPosts, enablePost }) {
  const [usuarios, setUsuarios] = useState([]);
  const [likedPosts, setLikedPosts] = useState([]);
  const [posts, setPosts] = useState([]);
  const user = JSON.parse(localStorage.getItem("currentUser"));
  const [textPost, setTextPost] = useState("");

  useEffect(() => {
    setUsuarios(data.usuarios);
    setPosts([...filteredPosts]);

    const savedLikes = localStorage.getItem("likes");
    if (savedLikes) {
      setLikedPosts(savedLikes.split(";"));
    }
  }, [filteredPosts]);

  function likePost(postId) {
    const newLikedPosts = likedPosts.includes(postId.toString())
      ? likedPosts.filter((id) => id !== postId.toString())
      : [...likedPosts, postId.toString()];

    localStorage.setItem("likes", newLikedPosts.join(";"));
    setLikedPosts(newLikedPosts);
  }

  const createPost = () => {
    const agora = new Date();
    const dia = String(agora.getDate()).padStart(2, "0");
    const mes = String(agora.getMonth() + 1).padStart(2, "0");
    const ano = String(agora.getFullYear());
    const hora = String(agora.getHours()).padStart(2, "0");
    const minuto = String(agora.getMinutes()).padStart(2, "0");

    const dataHoraInt = Number.parseInt(
      `${dia}${mes}${ano}${hora}${minuto}`,
      10
    );
    const newPost = {
      id: dataHoraInt,
      titulo: null,
      conteudo: textPost,
      usuario_id: user.id,
      data: `${ano}-${mes}-${dia} ${hora}:${minuto}:00`,
      grupo_id: null,
    };

    const savedPosts = localStorage.getItem("posts");
    const postsArray = savedPosts ? JSON.parse(savedPosts) : [];

    postsArray.push(newPost);
    localStorage.setItem("posts", JSON.stringify(postsArray));

    setPosts((prevPosts) => [newPost, ...prevPosts]);
    setTextPost("");

    ListPost.propTypes = {
      filteredPosts: PropTypes.array.isRequired,
      enablePost: PropTypes.bool.isRequired,
    };
  };

  return (
    <>
      <ul className="h-36">
        {posts
          .sort((a, b) => new Date(b.data) - new Date(a.data))
          .map((post) => {
            const user = usuarios.find((x) => x.id === post.usuario_id);
            return (
              <li
                key={post.id}
                className="mb-6 p-4 border rounded-lg shadow-md bg-cinza relative"
              >
                <button
                  type="button"
                  className="text-branco font-md absolute right-2 top-2"
                  onClick={() => likePost(post.id)}
                >
                  {likedPosts.includes(post.id.toString()) ? (
                    <FaHeart size={25} color="#ff0000" />
                  ) : (
                    <CiHeart size={25} />
                  )}
                </button>
                <div className="flex flex-row items-end justify-start">
                  <h2 className="text-xl text-azul-claro font-semibold">
                    {user?.nome || "Eu"}
                  </h2>
                  <p className="text-sm text-branco ml-4">
                    {post.data.split(" ")[0]}
                  </p>
                </div>
                <p className="mt-2 text-branco">{post.conteudo}</p>
              </li>
            );
          })}
      </ul>

      {user && enablePost && (
        <div className="fixed bottom-20 lg:bottom-2 flex justify-start items-center w-full px-4 md:px-0 ">
        <input
            className="bg-preto border-2 rounded-full px-6 py-2 border-azul-claro h-14 w-full max-w-[570px] md:mr-4"
            value={textPost}
            onChange={(e) => setTextPost(e.target.value)}
        />
        <button
            type="button"
            onClick={createPost}
            className="m-10 p-4 md:w-auto bg-azul-marinho rounded-full hover:bg-azul-claro"
        >
            Novo Post
        </button>
    </div>
      )}
    </>
  );

}

export default ListPost;
