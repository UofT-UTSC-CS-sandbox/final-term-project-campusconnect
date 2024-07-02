import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';
import { StreamCall, StreamTheme } from '@stream-io/video-react-sdk';
import MeetingSetup from './MeetingSetup.jsx';
import MeetingRoom from './MeetingRoom.jsx';
import { useGetCallById } from '../hooks/useGetCallById.js';
const Meeting = () => {
    useEffect(() => {
        document.title = "Meeting - ULearn"
      }, [])

    const { id } = useParams();
    const { user, isLoaded } = useUser();
    const [isSetupComplete, setIsSetupComplete] = useState(false);
    const { call, isCallLoading } = useGetCallById(id);

    if (!isLoaded || isCallLoading) {
        return <h1>Loading...</h1>;
    }

    return (
        <StreamCall call={call}>
            <StreamTheme >
                {!isSetupComplete ? (
                    <MeetingSetup setIsSetupComplete={setIsSetupComplete}/>
                ) : (
                    <MeetingRoom />
                )}
            </StreamTheme>
        </StreamCall>
    );
};

export default Meeting;