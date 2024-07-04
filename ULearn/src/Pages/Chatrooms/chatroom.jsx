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

const ChatRoom = () => {
  const apiKey = 'g8evherw6njt';
  const [client, setClient] = useState(null);
  const {user, isLoaded} = useUser(null);
  
  useEffect(() => {
    if (!isLoaded ) {
      console.log("User not loaded");
      return;
    }
    if (!user){
      console.log("User not found");
      return;
    }
    
    console.log(apiKey);
    if (!apiKey) {
      console.error("Missing API Key");
      return;
    }
    axios.post('http://localhost:3001/getChatToken', user).then(response => {      
      const token = response.data;
      const client = StreamChat.getInstance(apiKey);
      if (!client.userID) {
        client.connectUser(
          {
            //this is the user that is logged in
            id: user.id,
            name: user.firstName,
            image: user.imageUrl,
          },
          token
        ).then(() => {
          setClient(client);
          
          const channel = client.channel('messaging', {
            //add 2nd user to channel: replace 'ulearn4' with 2nd user id
            members: [user.id, 'ulearn4'],
            //channel name should be 2nd users name
            //channel image should be 2nd users image
          });
          channel.create();
          
        }).catch(error => {
          console.error("Failed to connect user:", error);
        });
      } else {
        // If the client is already connected, just update the state
        setClient(client);
      }
      
    }).catch(error => {
      console.error("Failed to get user token:", error);
    });
}, [user, isLoaded]);

const filters = user ? { members: { $in: [user.id] }, type: 'messaging' } : {};
const options = { presence: true, state: true };
const sort = { last_message_at: -1 };
      
  if (!client) return <div>Loading...</div>;

  return (
    <Chat client={client}>
      <ChannelList  filters={filters} options={options} sort={sort} />
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