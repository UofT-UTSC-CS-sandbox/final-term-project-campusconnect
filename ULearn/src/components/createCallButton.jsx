import { useUser } from '@clerk/clerk-react';
import { Call, useStreamVideoClient } from '@stream-io/video-react-sdk';
import { useState } from 'react';
import { Router } from 'react-router';
import { useNavigate } from 'react-router-dom';

const CreateCallButton = () => {
    let navigate = useNavigate();
    const { user } = useUser();
    const client = useStreamVideoClient();
    const [values, setValues] = useState({
        dateTime: new Date(),
        description: '',
        link: '',
    })
    const [callDetails, setCallDetails] = useState<Call>(null);

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
                navigate(`/meeting/${call.id}`);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <button onClick={handleCreate}>Create Call</button>
        </div>
    );
};

export default CreateCallButton;