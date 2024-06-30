import { StreamVideo, StreamVideoClient } from '@stream-io/video-react-sdk';
import { ReactNode, useEffect, useState } from 'react';
import { useUser } from "@clerk/clerk-react";
import axios from 'axios';

const apiKey = import.meta.env.VITE_STREAM_VIDEO_API_KEY;

const StreamVideoCallProvider = ({ children }) => {
  const [videoClient, setVideoClient] = useState(null);
  const { user, isLoaded } = useUser();
  useEffect(() => {
    if (!isLoaded || !user) return;
      if (!apiKey) throw new Error("Missing API Key");

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
    });
  }, [user, isLoaded]);

  if (!videoClient) {
    return (
      <>
        <h1 className="flex-center">Loading</h1>
      </>
    )
  }

  return (
    <StreamVideo client={videoClient}>
      {children}
    </StreamVideo>
  );
};

export default StreamVideoCallProvider;