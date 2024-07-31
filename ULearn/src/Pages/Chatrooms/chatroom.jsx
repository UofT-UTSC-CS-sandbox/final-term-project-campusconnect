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
import { useLocation } from 'react-router';
import Nav from '../../components/Nav/Nav.jsx';
import CreateCallButton from '../../components/createCallButton.jsx';

const ChatRoom = () => {
  const {state} = useLocation();
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
            
          }).catch(error => {
            console.error("Failed to connect user:", error);
          });
        } else {
          // If the client is already connected, just update the state
          setClient(client);
        }
        if (state != null){
          const {clerkid, tutorname, tutorimage} = state;    
        const tutorData = {
            clerkid: clerkid,
            name: tutorname,
            image: tutorimage,
        };
        axios.post('http://localhost:3001/getChatToken', tutorData).then(response => {      
          const tokentutor = response.data;
          const tutorclient = StreamChat.getInstance(apiKey);
          if (!tutorclient.userID) { //if there's no tutor in the stream api
            tutorclient.connectUser( //connect them
              {
                //this is the tutor
                id: tutorclient.id,
                name: tutorclient.firstName,
                image: tutorclient.imageUrl,
              },
              tokentutor
            ).then(() => {
              //creates a messaging channel between user and tutor
              const channel = client.channel('messaging', {
                members: [user.id, clerkid],
              });
              channel.create();
            }).catch(error => {
              console.error("Failed to connect user:", error);
            });
          } else { // if there already is a tutor in stream api
            //creates a messaging channel between user and tutor
            const channel = client.channel('messaging', {
              members: [user.id, clerkid],
            });
            channel.create();
          }
        }).catch(error => {
          console.error("Failed to get tutor token:", error);
        });
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
    <>
    <div className="sticky top-0 z-20 bg-white">
    <Nav/>
    </div>
    <div className="chatroom">
    <Chat client={client} classname='left-100'>
        <ChannelList  filters={filters} options={options} sort={sort} />
        <Channel>
          <Window>
            <div className="flex justify-between items-center">
            <ChannelHeader />
            <CreateCallButton />
            </div>
              <MessageList />
            <MessageInput />
          </Window>
          <Thread />
        </Channel>
      </Chat>
    </div>
    </>
  );
};

export default ChatRoom;