import React from 'react';
import HomeOptions from '../../components/HomeOptions.jsx';

function Stream() {
    return (
        <main className='outlet flex flex-col h-[95vh]'>
            <div className='flex-grow'>Stream</div>
            <HomeOptions/>
        </main>
    );
}

export default Stream;