

/**
 * @file MeetingSetup.jsx
 * @desc A component for setting up a meeting with video and audio options.
 */

import { DeviceSettings, VideoPreview, useCall } from "@stream-io/video-react-sdk";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

/**
 * MeetingSetup component.
 * @param {Object} props - The component props.
 * @param {Function} props.setIsSetupComplete - A function to set the setup completion status.
 * @returns {JSX.Element} - The rendered MeetingSetup component.
 */
const MeetingSetup = ({ setIsSetupComplete }) => {
    const [isMicCamEnabled, setIsMicCamEnabled] = useState(false);
    const call = useCall();
    const navigate = useNavigate();

    if (!call) {
        throw new Error("usecall must be used within StreamCall component");
    }

    /**
     * Disable camera and microphone if checkbox is ticked. Otherwise, attempt to turn them on.
     */
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
        <div className="flex h-screen w-full flex-col items-center justify-center gap-3">
            <h1 className="text-3xl font-bold">Setup</h1>
            <VideoPreview />
            <div className="flex h-16 items-center justify-center gap-3">
                <label className="flex items-center justify-center gap-2 font-medium">
                    <input
                        type="checkbox"
                        checked={isMicCamEnabled}
                        onChange={(e) => setIsMicCamEnabled(e.target.checked)}
                        className="m-0 w-auto" />
                    Join with mic and camera off
                </label>
                <div className="text-white">
                    <DeviceSettings />
                </div>
            </div>
            <div className="flex items-center gap-2">
                <button
                    className="border-2 border-black rounded-md px-3 py-1"
                    onClick={() => {
                        call.join();
                        setIsSetupComplete(true);
                    }}>
                    Join Call
                </button>
                <button
                    className="border-2 border-black rounded-md px-3 py-1"
                    onClick={() => {
                        navigate(-1);
                    }}>
                    Exit
                </button>
            </div>
        </div>
    );
};

export default MeetingSetup;