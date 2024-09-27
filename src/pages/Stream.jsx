import { useState, useEffect } from "react";
import ReactPlayer from "react-player";
import { FaRegHeart, FaHeart, FaYoutube } from "react-icons/fa";
import { CSSTransition } from "react-transition-group";
import "./Stream.css";

function Stream() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Verificações para o tamanho do vídeo baseado no tamanho da tela
  const getPlayerSize = () => {
    if (windowWidth > 1024) {
      return { width: "60%", height: "60%" }; // Computadores
    } else if (windowWidth > 640) {
      return { width: "90%", height: "90%" }; // Tablets
    } else {
      return { width: "100%", height: "100%" }; // Celulares
    }
  };

  const playerSize = getPlayerSize();

  const initialLikes = localStorage.getItem("likes")
    ? parseInt(localStorage.getItem("likes"))
    : 0;
  const [likes, setLikes] = useState(initialLikes);
  const [liked, setLiked] = useState(localStorage.getItem("liked") === "true");
  const [comments, setComments] = useState([]);

  const handleLike = () => {
    if (!liked) {
      setLikes(likes + 1);
      setLiked(true);
      localStorage.setItem("likes", likes + 1);
      localStorage.setItem("liked", "true");
    } else {
      setLikes(likes - 1);
      setLiked(false);
      localStorage.setItem("likes", likes - 1);
      localStorage.setItem("liked", "false");
    }
  };

  const handleComment = (comment) => {
    setComments([...comments, comment]);
  };

  const initialTime = localStorage.getItem("time")
    ? parseInt(localStorage.getItem("time"))
    : 58 * 60 * 60;
  const [time, setTime] = useState(initialTime);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime((prevTime) => {
        const newTime = prevTime > 0 ? prevTime - 1 : 58 * 60 * 60;
        localStorage.setItem("time", newTime);
        return newTime;
      });
    }, 1000);

    window.addEventListener("beforeunload", () => {
      const now = new Date().getTime();
      localStorage.setItem("closeTime", now);
    });

    return () => {
      clearInterval(intervalId);
      const now = new Date().getTime();
      localStorage.setItem("closeTime", now);
    };
  }, []);

  useEffect(() => {
    const closeTime = localStorage.getItem("closeTime");
    if (closeTime) {
      const now = new Date().getTime();
      const diff = Math.floor((now - closeTime) / 1000);
      setTime((prevTime) => Math.max(prevTime - diff, 0));
    }
  }, []);

  const days = Math.floor(time / (24 * 60 * 60));
  const hours = Math.floor((time % (24 * 60 * 60)) / 3600);
  const minutes = Math.floor((time % 3600) / 60);
  const seconds = time % 60;

  return (
    <>
      <header className="flex flex-col -translate-y-6">
        <h1 className=" translate-y-6 text-3xl ml-2 font-light ">
          Próxima corrida em
        </h1>
        <h2 className="text-azul-claro text-[2.4rem] ml-2 self-center font-bold z-10 border-azul-claro border-b border-r pr-4">{`${days} dias, ${hours}:${minutes}:${seconds}`}</h2>
      </header>
      <main className="stream">
        <h2 className="text-sm  font-extralight">
          <span className="text-azul-claro text-lg font-semibold">
            Enquanto isso,
          </span>
          assista ao vídeo mais recente.
        </h2>
        <div className="player-wrapper">
          <ReactPlayer
            className="react-player"
            url="https://youtu.be/ltYnDHdF1Gg?si=8h-VKdTLIOrj03xB"
            controls={true}
            width={playerSize.width}
            height={playerSize.height}
          />
        </div>
        <button onClick={handleLike} className="text">
          <CSSTransition in={liked} timeout={500} classNames="like-transition">
            {liked ? (
              <FaHeart className="like likeicon" />
            ) : (
              <FaRegHeart className="liked likeicon" />
            )}
          </CSSTransition>
        </button>
        <p>{likes}</p>
        <input
          className="bg-cinza p-1"
          type="text"
          onSubmit={handleComment}
          placeholder=" Add a comment"
        />
        <div>
          {comments.map((comment, index) => (
            <p key={index}>{comment}</p>
          ))}
        </div>
        <h2>Assista mais vídeos no canal oficial da Formula E!</h2>
        <FaYoutube />
      </main>
    </>
  );
}

export default Stream;
