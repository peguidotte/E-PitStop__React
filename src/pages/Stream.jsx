import { useState, useEffect } from 'react';
import ReactPlayer from 'react-player';
import { FaRegHeart, FaHeart, FaYoutube  } from "react-icons/fa";
import { CSSTransition } from 'react-transition-group';
import './Stream.css'

function Stream() {
    const initialLikes = localStorage.getItem('likes') ? parseInt(localStorage.getItem('likes')) : 0;
    const [likes, setLikes] = useState(initialLikes);
    const [liked, setLiked] = useState(localStorage.getItem('liked') === 'true');
    const [comments, setComments] = useState([]);

    const handleLike = () => {
        if (!liked) {
            setLikes(likes + 1);
            setLiked(true);
            localStorage.setItem('likes', likes + 1);
            localStorage.setItem('liked', 'true');
        } else {
            setLikes(likes - 1);
            setLiked(false)
            localStorage.setItem('likes', likes - 1);
            localStorage.setItem('liked', 'false');
        }
    };

    const handleComment = (comment) => {
        setComments([...comments, comment]);
    };

    const initialTime = localStorage.getItem('time') ? parseInt(localStorage.getItem('time')) : 58 * 60 * 60;
    const [time, setTime] = useState(initialTime);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setTime(prevTime => {
                const newTime = prevTime > 0 ? prevTime - 1 : 58 * 60 * 60;
                localStorage.setItem('time', newTime);
                return newTime;
            });
        }, 1000);

        window.addEventListener('beforeunload', () => {
            const now = new Date().getTime();
            localStorage.setItem('closeTime', now);
        });

        return () => {
            clearInterval(intervalId); 
            const now = new Date().getTime();
            localStorage.setItem('closeTime', now);
        };
    }, []);

    useEffect(() => {
        const closeTime = localStorage.getItem('closeTime');
        if (closeTime) {
            const now = new Date().getTime();
            const diff = Math.floor((now - closeTime) / 1000);
            setTime(prevTime => Math.max(prevTime - diff, 0));
        }
    }, []);

    const days = Math.floor(time / (24 * 60 * 60));
    const hours = Math.floor((time % (24 * 60 * 60)) / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;

    return (
        <>
            <header className='flex flex-col border-b-2 -translate-y-2'>
                <h1 className=' translate-y-3'>Próxima corrida em: </h1>
                <h2 className='text-azul-claro text-[2.75rem] self-center'>{`${days} DIAS, ${hours}:${minutes}:${seconds}`}</h2>
                <div>
                    <h2 className='hidden'>Assita a transmissão com a sua COMUNIDADE!</h2>
                    <p className='hidden'>Ganhe pontos ao assistir, troque seus pontos por itens, beneficios, ou até ingressos!</p>
                </div>
            </header>
            <main className='stream'>
                <h2>Vídeo mais recente</h2>
                <ReactPlayer url='https://youtu.be/ltYnDHdF1Gg?si=8h-VKdTLIOrj03xB' controls={true} />
                <button onClick={handleLike} className='text'> 
                    <CSSTransition in={liked} timeout={500} classNames="like-transition">
                        {liked ? <FaHeart className='like likeicon'/> : <FaRegHeart className='liked likeicon'/>}
                    </CSSTransition>
                </button>
                <p>{likes}</p>
                <input className='bg-cinza p-1' type="text" onSubmit={handleComment} placeholder=" Add a comment" />
                <div>
                    {comments.map((comment, index) => (
                        <p key={index}>{comment}</p>
                    ))}
                </div>
                <h2>Assista mais vídeos no canal oficial da Formula E!</h2>
                <FaYoutube/>

            </main>
        </>
    );
}

export default Stream;