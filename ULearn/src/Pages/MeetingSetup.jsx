import { DeviceSettings, VideoPreview, useCall } from "@stream-io/video-react-sdk";
import { useState, useEffect } from "react";


const MeetingSetup = ({ setIsSetupComplete }) => {
    const [isMicCamEnabled, setIsMicCamEnabled] = useState(false);
    const call = useCall();

    if (!call) {
        throw new Error("usecall must be used within StreamCall component");
    }

    useEffect(() => {
        if (isMicCamEnabled) {
            call?.camera.disable();
            call?.microphone.disable();
        } else {
            call?.camera.enable();
            call?.microphone.enable();
        }
    }, [isMicCamEnabled, call?.camera, call?.microphone]);

    return (
        <div>
            <h1>Setup</h1>
            <VideoPreview />
            <div>
                <label>
                    <input type="checkbox" checked={isMicCamEnabled} onChange={(e) => setIsMicCamEnabled(e.target.checked)} />
                    Join with mic and camera off
                </label>
                <DeviceSettings />
            </div>
            <button onClick={() => {
                call.join();
                setIsSetupComplete(true);
            }}>
                Join Call
            </button>
        </div>
    );
};

export default MeetingSetup;