/**
 * @file createCallButton.jsx
 * @desc This file contains the CreateCallButton component, which is responsible for creating a call/meeting.
 */

import { useUser } from '@clerk/clerk-react';
import { useStreamVideoClient } from '@stream-io/video-react-sdk';
import { Phone } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

/**
 * CreateCallButton component.
 * This component is responsible for creating a call/meeting.
 *
 * @returns {JSX.Element} The CreateCallButton component.
 */
const CreateCallButton = () => {
    let navigate = useNavigate();
    const { user } = useUser();
    const client = useStreamVideoClient();
    const [values, setValues] = useState({
        dateTime: new Date(),
        description: '',
        link: '',
    })
    const [callDetails, setCallDetails] = useState(null);

    const handleCreate = async () => {
        if (!client || !user) {
            return;
        }
        
        // Create a new call with the user as host
        try {
            const id = crypto.randomUUID();
            const call = client.call('default', id); 
            if (!call) throw new Error('Failed to create call')
            const startsAt = new Date(Date.now()).toISOString(); // Start the call immediately
            const description = values.description || 'No description';
            await call.getOrCreate({ // Create the call
                data: {
                starts_at: startsAt,
                custom: {
                    description,
                },
                }
            });
            
            setCallDetails(call);

            if (!values.description) {
                toast.success("Meeting created successfully")
                navigate(`/meeting/${call.id}`);
            }

        } catch (error) {
            console.log(error);
            toast.error("Error: Failed to create meeting")
        }
    };

    return (
        <div>
            <Phone color="black" className="cursor-pointer" size={20} onClick={handleCreate} />
        </div>
    );
};

export default CreateCallButton;