import React from 'react';

const MessageButton = ({ props, handleMessageClick}) => {
    return (
        <button className='bg-blue-500 h-10 w-40 rounded-lg text-white '
            onClick={() => handleMessageClick(props)}>
            Message
        </button>
    );
};

export default MessageButton;
