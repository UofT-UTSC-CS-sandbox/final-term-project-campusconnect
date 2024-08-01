import React from 'react';

const MessageButton = ({ props, handleMessageClick}) => {
    return (
        <button className='bg-blue-500 block p-2 w-full rounded-lg text-white '
            onClick={() => handleMessageClick(props)}>
            Message
        </button>
    );
};

export default MessageButton;
