import React from 'react';
import HomeOptions from '../../components/HomeOptions.jsx';

const Chat = () => {
    return (
        <main className='outlet flex flex-col h-[95vh]'>
            <div className='flex-grow'>Videos</div>
            <HomeOptions/>
        </main>
    );
};

export default Chat;