import { useState, useEffect } from "react";
import ReactPlayer from "react-player";
import { FaRegHeart, FaHeart, FaYoutube } from "react-icons/fa";
import { CSSTransition } from "react-transition-group";
import "./Stream.css";
import Swal from "sweetalert2";

function Stream() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Verificações para o tamanho do vídeo baseado no tamanho da tela 
  // pq é impossivel estilizar isso com métodos normais
  const getPlayerSize = () => {
    if (windowWidth > 1024) {
      return { width: "70%", height: "70%" };
    } else if (windowWidth > 640) {
      return { width: "90%", height: "90%" };
    } else {
      return { width: "100%", height: "100%" };
    }
  };

  const playerSize = getPlayerSize();

  const initialLikes = localStorage.getItem("likes")
    ? parseInt(localStorage.getItem("likes"))
    : 0;
  const [likes, setLikes] = useState(initialLikes);
  const [liked, setLiked] = useState(localStorage.getItem("liked") === "true");

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

  const handleComment = () => {
    Swal.fire({
      title: 'Comentário enviado com sucesso ao Youtube!', icon: 'success', customClass: {
        popup: 'custom-swal-popup'
      }
    });

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

  const handleClick = () => {
    window.open('https://www.youtube.com/channel/SEU_CANAL', '_blank');
  };

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
      <header className="flex flex-col -translate-y-6 sm:translate-y-0 sm:flex-row sm:items-center sm:justify-center lg:gap-5">
        <h1 className=" translate-y-6 text-3xl ml-2 font-light sm:translate-y-0">
          Próxima corrida em
        </h1>
        <h2 className="text-azul-claro text-[2.4rem] ml-2 self-center font-bold z-10 border-azul-claro border-b border-r pr-4">{`${days} dias, ${hours}:${minutes}:${seconds}`}</h2>
      </header>
      <main className="flex flex-col gap-2 justify-center mt-3 px-2">
        <h2 className="text-sm font-extralight sm:px-10 lg:px-30 xl:px-40">
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
        <div className="flex justify-between gap-2 px-1 items-center sm:px-10 sm:-translate-y-10 lg:px-36 lg:-translate-y-40 xl:px-40 xl:-translate-y-44">
          <div className="flex items-center">
            <input
              className="bg-cinza p-1"
              type="text"
              placeholder="Enviar feedback"
            />
            <button onClick={handleComment} className="bg-azul-claro text-white p-1">Enviar</button>
          </div>
          <div className="flex gap-2">
            <button onClick={handleLike}>
              <CSSTransition in={liked} timeout={500} classNames="like-transition">
                {liked ? (
                  <FaHeart className="like likeicon" />
                ) : (
                  <FaRegHeart className="liked likeicon" />
                )}
              </CSSTransition>
            </button>
            <p>{likes}</p>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center mt-10 sm:mt-4 sm:px-10 lg:mt-0 lg:flex-row lg:gap-2 lg:-translate-y-40 lg:px-20">
          <h2 className="text-2xl text-pretty text-center lg:text-end">Assista mais vídeos como esse no canal oficial da <span className="text-4xl text-azul-claro">Formula E!</span></h2>
          <button onClick={handleClick} className="focus:outline-none">
            <FaYoutube className="text-9xl text-azul-claro lg:text-azul-marinho hover:text-azul-claro" />
        </button>
        </div>
      </main>
    </>
  );
}

export default Stream;
