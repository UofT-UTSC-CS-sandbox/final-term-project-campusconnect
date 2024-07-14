/**
 * Represents the local participant in the video call.
 * @type {Object}
 */

import { useCall, useCallStateHooks } from "@stream-io/video-react-sdk";
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

const EndCallButton = () => {
  const call = useCall();
  const navigate = useNavigate();
  const { useLocalParticipant } = useCallStateHooks();


  const localParticipant = useLocalParticipant();

  const isMeetingOwner =
    localParticipant &&
    call?.state.createdBy &&
    localParticipant.userId === call.state.createdBy.id;

  if (!isMeetingOwner) {
    return null;
  }

  return (
    <button
      className="px-3 py-2 rounded-lg bg-red-500"
      onClick={async () => {
        await call.endCall();
        navigate("/homePage"); // when tutor selects end call, redirect to home page
      }}
    >
      End Call for Everyone
    </button>
  );
};

export default EndCallButton;
