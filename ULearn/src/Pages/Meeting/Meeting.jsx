

/**
 * @file Meeting.jsx
 * @desc This file contains the Meeting component, which is responsible for rendering the meeting page.
 * The component fetches the call details using the `useGetCallById` hook and displays a loading message if the user or call is still loading.
 * Once the user and call details are loaded, the component renders the StreamCall component from the @stream-io/video-react-sdk library.
 * The StreamCall component is wrapped in the StreamTheme component to provide styling.
 * If the setup is not complete, the MeetingSetup component is rendered to allow the user to configure their audio and video settings.
 * Once the setup is complete, the MeetingRoom component is rendered to display the meeting room.
 */
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import { StreamCall, StreamTheme } from "@stream-io/video-react-sdk";
import MeetingSetup from "../../components/MeetingSetup.jsx";
import MeetingRoom from "../../components/MeetingRoom.jsx";
import { useGetCallById } from "../../hooks/useGetCallById.js";
import { useLocation } from "react-router-dom";

/**
 * Represents a Meeting component.
 * 
 * @component
 * @example
 * // Usage
 * <Meeting />
 */
const Meeting = () => {
  useEffect(() => {
    document.title = "Meeting - ULearn";
  }, []);

  const { id } = useParams();
  const { user, isLoaded } = useUser();
  const [isSetupComplete, setIsSetupComplete] = useState(false);
  const { call, isCallLoading } = useGetCallById(id);
  //const { state } = useLocation(); // Get state from location
  //const tutorEmail = state?.tutorEmail; // Retrieve tutorEmail from state
  const queryParams = new URLSearchParams(location.search);
  const tutorEmail = queryParams.get('tutorEmail'); // Retrieve tutorEmail from URL parameters
  /*
   * If the user is not loaded or the call is loading, display a loading message
   */

  if (!isLoaded || isCallLoading) {
    return <h1>Loading...</h1>;
  }

  /*
   * First, send the user to a meeting setup page where they can configure their audio and video settings.
   * Once the setup is complete, the user joins the call.
   */
  return (
    <StreamCall call={call}>
      <StreamTheme>
        {!isSetupComplete ? (
          <MeetingSetup setIsSetupComplete={setIsSetupComplete} />
        ) : (
          <MeetingRoom tutorEmail={tutorEmail}/>
        )}
      </StreamTheme>
    </StreamCall>
  );
};

export default Meeting;
