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

const apiKey = 'g8evherw6njt';
//const apiSecret = '2x2rezwpctxjeuvu65vt5hxwtzg84ve6zhnyfbt5e7bwd7h4emckuavq28ghph6p';
const userId = 'ulearn4';
// Assume this token is securely fetched from your server
//const serverClient = StreamChat.getInstance( apiKey, apiSecret);
// Create User Token
//const userToken = serverClient.createToken(userId);
//console.log(userToken);

const filters = { members: { $in: [userId] }, type: 'messaging' };
const options = { presence: true, state: true };
const sort = { last_message_at: -1 };



const chatRoom = () => {
  const [client, setClient] = useState(null);

  useEffect(() => {
    const initChat = async () => {
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
      // return () => {
      //   if (client) client.disconnectUser();
      // };
   

    
  }, []);

  if (!client) return <div>Loading...</div>;

  return (
    <Chat client={client}>
      <ChannelList filters={filters} options={options} sort={sort} />
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

export default chatRoom;