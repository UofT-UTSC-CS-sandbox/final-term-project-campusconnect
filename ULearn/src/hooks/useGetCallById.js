
/**
 * Custom hook to get a call by its ID.
 * @param {string} id - The ID of the call.
 * @returns {Object} - An object containing the call and a boolean indicating if the call is loading.
 */
import { useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useEffect, useState } from "react"

export const useGetCallById = (id) => {
    const [call, setCall] = useState();
    const [isCallLoading, setIsCallLoading] = useState(true);
    const client = useStreamVideoClient();

    useEffect(() => {
        console.log(client);
        if (!client) return;
        const loadCall = async () => {
            const { calls } = await client.queryCalls({
                filter_conditions: {
                    id
                }
            })
            if (calls.length > 0) setCall(calls[0]);

            setIsCallLoading(false);
        }
        loadCall();
    }, [client, id]);

    return { call, isCallLoading };
}