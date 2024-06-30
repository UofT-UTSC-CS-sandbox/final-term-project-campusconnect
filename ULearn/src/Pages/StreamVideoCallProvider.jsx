import { StreamVideo, StreamVideoClient } from '@stream-io/video-react-sdk';
import { useEffect, useState } from 'react';
import { useUser } from "@clerk/clerk-react";
import axios from 'axios';

const apiKey = import.meta.env.VITE_STREAM_VIDEO_API_KEY;

const StreamVideoCallProvider = ({ children }) => {
  
  const [videoClient, setVideoClient] = useState(null);
  const { user, isLoaded } = useUser(null);

  useEffect(() => {
    if (!isLoaded || !user) return;
    if (!apiKey) {
      console.error("Missing API Key");
      return;
    }

    axios.post('http://localhost:3001/getVideoToken', user).then(response => {      
      const token = response.data;
      const client = new StreamVideoClient({
        apiKey,
        user: {
          id: user.id,
          name: user.fullName,
          image: user.profileImageUrl,
        },
        token,
      });
      setVideoClient(client);
    }).catch(error => {
      console.error("Failed to get video token:", error);
    });
  }, [user, isLoaded]);

  // Always render children, wrap with StreamVideo if videoClient is available
  return (
    <>
      {videoClient ? (
        <StreamVideo client={videoClient}>
          {children}
        </StreamVideo>
      ) : (
        <>
          {children}
        </>
      )}
    </>
  );
};

export default StreamVideoCallProvider;