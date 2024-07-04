/**
 * @file Provides the StreamVideoCallProvider component.
 * @module StreamVideoCallProvider
 */

import { StreamVideo, StreamVideoClient } from "@stream-io/video-react-sdk";
import { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";
import axios from "axios";

//apiKey for Stream Video
const apiKey = import.meta.env.VITE_STREAM_VIDEO_API_KEY;

/**
 * Represents the StreamVideoCallProvider component.
 * @param {Object} props - The component props.
 * @param {ReactNode} props.children - The child components.
 * @returns {ReactNode} The rendered component.
 */
const StreamVideoCallProvider = ({ children }) => {
  const [videoClient, setVideoClient] = useState(null);
  const { user, isLoaded } = useUser(null);

  useEffect(() => {
    if (!isLoaded || !user) return;
    if (!apiKey) {
      console.error("Missing API Key");
      return;
    }
    // Obtain key based on Clerk user that's currently logged in
    axios
      .post("http://localhost:3001/getVideoToken", user)
      .then((response) => {
        const token = response.data;
        const client = new StreamVideoClient({
          apiKey,
          user: {
            id: user.id,
            name: user.fullName,
            image: user.imageUrl,
          },
          token,
        });
        setVideoClient(client);
      })
      .catch((error) => {
        console.error("Failed to get video token:", error);
      });
  }, [user, isLoaded]);

  // Always render children, wrap with StreamVideo if videoClient is available
  return (
    <>
      {videoClient ? (
        <StreamVideo client={videoClient}>{children}</StreamVideo>
      ) : (
        <>{children}</>
      )}
    </>
  );
};

export default StreamVideoCallProvider;
