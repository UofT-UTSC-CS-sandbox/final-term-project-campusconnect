
/**
 * MeetingRoom component represents the page where the video call takes place.
 * It includes the video call layout, call controls, participants list, and other related functionalities.
 */
import {
  CallControls,
  CallParticipantsList,
  CallStatsButton,
  CallingState,
  PaginatedGridLayout,
  SpeakerLayout,
  useCallStateHooks,
} from "@stream-io/video-react-sdk";
import { useState } from "react";
import { Grid2X2, Users } from "lucide-react";
import EndCallButton from "./endCallButton";
import { useNavigate } from "react-router-dom";

const MeetingRoom = () => {
  const [layout, setLayout] = useState("speaker-right");
  const [showParticipants, setShowParticipants] = useState(false);
  const { useCallCallingState } = useCallStateHooks();
  const callingState = useCallCallingState();
  const navigate = useNavigate();

  //Redirect user to homepage upon hanging up
  if (callingState === CallingState.LEFT) {
    navigate("/homePage");
  }

  //Display loading message if user is not in call after clicking join button
  if (callingState !== CallingState.JOINED) return <h1>Joining...</h1>;

  //Display the call layout based on the selected layout
  const CallLayout = () => {
    if (layout === "speaker-right") {
        return <SpeakerLayout participantsBarPosition="left" />;
    } else {
        return <SpeakerLayout participantsBarPosition="right" />;
    }
  };

  return (
    <section className="relative h-screen w-full overflow-hidden pt-4 text-white ">
      <div className="relative flex size-full items-center justify-center">
        <div className="flex size-9/12 p-2 items-center">
          <CallLayout />
        </div>
        <div
          className={` text-black rounded-xl m-2 border-2 border-black p-4 h-[calc(100vh-86px)] ml-2 ${
            showParticipants ? "block" : "hidden"
          }`}
        >
          <CallParticipantsList onClose={() => setShowParticipants(false)} />
        </div>
      </div>
      <div className="fixed bottom-0 flex w-full items-center justify-center gap-5 flex-wrapy">
        <CallControls />
        <select
          value={layout}
          onChange={(e) => setLayout(e.target.value)}
          className="bg-black rounded-md px-1.5 py-1.5 outline-none cursor-pointer hover:bg-[#323b44]"
        >
          <option value="speaker-left">Speaker Left</option>
          <option value="speaker-right">Speaker Right</option>
        </select>
        <CallStatsButton />
        <button onClick={() => setShowParticipants((prev) => !prev)}>
          <div className="cursor-pointer rounded-md bg-black px-5 py-2 hover:bg-[#323b44]">
            <Users size={20} className="text-white" />
          </div>
        </button>
        <EndCallButton />
      </div>
    </section>
  );
};

export default MeetingRoom;
