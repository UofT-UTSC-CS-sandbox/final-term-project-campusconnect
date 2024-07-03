import React, { useState, useEffect } from 'react';
import { StreamChat } from 'stream-chat';
import {
  Chat,
  Channel,
  ChannelList,
  Window,
  ChannelHeader,
  MessageList,
  MessageInput,
  Thread,
} from 'stream-chat-react';
import './chatroom_layout.css';
import 'stream-chat-react/dist/css/v2/index.css';
import { useUser } from "@clerk/clerk-react";
import axios from 'axios';

//const apiKey = 'g8evherw6njt';
//const apiSecret = '2x2rezwpctxjeuvu65vt5hxwtzg84ve6zhnyfbt5e7bwd7h4emckuavq28ghph6p';
//const userId = 'ulearn4';
// Assume this token is securely fetched from your server
//const serverClient = StreamChat.getInstance( apiKey, apiSecret);
// Create User Token
//const userToken = serverClient.createToken(userId);
//console.log(userToken);


const apiKey = import.meta.env.VITE_STREAM_VIDEO_API_KEY;


const ChatRoom = () => {
  const [client, setClient] = useState(null);
  const { isLoaded } = useUser(null);
  const {user} = useUser();
  //console.log(user.id);
  console.log('hello');
  useEffect(() => {
    if (!isLoaded || !user) return;
    
    /*const initChat = async () => {
      if (!client){
        const chatClient = StreamChat.getInstance(apiKey);
        
        try {
          const userToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoidWxlYXJuNCJ9.L66zdSYEbbUIVLO-ArqdFi_aKrzsReW3CKCe3QjS6Hs';
          await chatClient.connectUser({ id: userId }, userToken);
          setClient(chatClient);
        } catch (error) {
          console.error('Failed to connect user:', error);
        }

      }
      
    };
  
      initChat();
      
  }, []);*/
  console.log(apiKey);
  if (!apiKey) {
    console.error("Missing API Key");
    return;
  }

  axios.post('http://localhost:3001/getChatroomToken', user).then(response => {      
    const token = response.data;
    const client = new StreamChat({
      apiKey,
      user: {
        id: user.id,
        name: user.fullName,
        image: user.imageUrl,
      },
      token,
    });
    client.connectUser({ id: user.id }, token);
    setClient(client);
  }).catch(error => {
    console.error("Failed to get user token:", error);
  });
}, [user, isLoaded]);
//console.log(user.id);
//const filters = { members: { $in: [user.id] }, type: 'messaging' };
// const options = { presence: true, state: true };
// const sort = { last_message_at: -1 };
      
    

  if (!client) return <div>Loading...</div>;

  return (
    <Chat client={client}>
      <ChannelList /*filters={filters} options={options} sort={sort}*/ />
      <Channel>
        <Window>
          <ChannelHeader />
          <MessageList />
          <MessageInput />
        </Window>
        <Thread />
      </Channel>
    </Chat>
  );
};

export default ChatRoom;