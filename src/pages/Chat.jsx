import React from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

const Chat = () => {
    const handleGoBack = () => {
        window.history.back();
    };

    return (

        <div style={{display: 'flex',flexDirection: 'column',justifyContent: 'center',alignItems: 'center',height: '100vh',padding: '20px',}}>            
            <div className='w-full md:w-10/12 md:mb-[-80px]'>
                <DotLottieReact
                    src="/maintenance.lottie"
                    loop
                    autoplay
                />
            </div>

            <h1 style={{fontSize: '24px',fontWeight: 'bold',color: '#fff',marginBottom: '10px'}}>Em Desenvolvimento</h1>

            <p style={{fontSize: '16px',color: '#999',textAlign: 'center',marginBottom: '20px',padding: '0 10px',}}>
                Esta página está sendo construída. Em breve estará disponível com novas funcionalidades.
            </p>

            <button type='button' className='p-4 w-32 bg-azul-marinho rounded-full' onClick={handleGoBack}>
                Voltar
            </button>
        </div>


    );
};

const styles = {
    container: {

    },

    title: {

    },
    message: {

    },
    button: {
        padding: '10px 20px',
        fontSize: '16px',
        backgroundColor: '#4CAF50',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
    },
};

export default Chat;