import {
  CallControls,
  CallParticipantsList,
  CallStatsButton,
  PaginatedGridLayout,
  SpeakerLayout,
} from "@stream-io/video-react-sdk";
import { useState } from "react";
import { Grid2X2, Users } from "lucide-react";
import EndCallButton from "../components/endCallButton";

const MeetingRoom = () => {
  const [layout, setLayout] = useState("grid");
  const [showParticipants, setShowParticipants] = useState(false);

  const CallLayout = () => {
    switch (layout) {
      case "grid":
        return <PaginatedGridLayout />;
      case "speaker-right":
        return <SpeakerLayout participantsBarPosition="left" />;
      default:
        return <SpeakerLayout participantsBarPosition="right" />;
    }
  };

  return (
    <section className="relative h-screen w-full overflow-hidden pt-4 text-white ">
      <div className="relative flex size-full items-center justify-center">
        <div className="flex size-full p-2 max-w-[1300px] items-center">
          <CallLayout />
        </div>
        <div
          className={` text-black rounded-xl m-2 border-2 border-black p-4 h-[calc(100vh-86px)] ml-2 ${showParticipants ? 'block' : 'hidden'}`}
        >
          <CallParticipantsList onClose={() => setShowParticipants(false)} />
        </div>
      </div>
      <div className="fixed bottom-0 flex w-full items-center justify-center gap-5">
        <CallControls />
        <select
          value={layout}
          onChange={(e) => setLayout(e.target.value)}
          className="bg-black rounded-md px-1.5 py-1.5 outline-none cursor-pointer hover:bg-[#323b44]"
        >
          <option value="speaker-left">Speaker Left</option>
          <option value="speaker-right">Speaker Right</option>
          <option value="grid">Grid</option>
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
