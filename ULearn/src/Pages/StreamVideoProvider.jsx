import { StreamVideo, StreamVideoClient } from '@stream-io/video-react-sdk';
import { ReactNode, useEffect, useState } from 'react';
import { useUser, isLoaded } from "@clerk/clerk-react";
import axios from 'axios';

const apiKey = process.env.STREAM_VIDEO_API_KEY;

const StreamVideoProvider = () => {
  const [videoClient, setVideoClient] = useState < StreamVideoClient > (null);

  useEffect(() => {
    const { user, isLoaded } = useUser();
    const token = axios.get('/getVideoToken', user);
    if (!isLoaded || !user) return;
    if (!apiKey) throw new Error("Missing API Key");

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
    </StreamVideo>
  );
};

export default StreamVideoProvider