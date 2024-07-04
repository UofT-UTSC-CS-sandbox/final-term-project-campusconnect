import { useUser } from '@clerk/clerk-react';
import { useStreamVideoClient } from '@stream-io/video-react-sdk';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
        
        try {
            const id = crypto.randomUUID();
            const call = client.call('default', id);
            if (!call) throw new Error('Failed to create call')

            const startsAt = new Date(Date.now()).toISOString();
            const description = values.description || 'No description';
            await call.getOrCreate({
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
            <button onClick={handleCreate}>Create Call</button>
        </div>
    );
};

export default CreateCallButton;