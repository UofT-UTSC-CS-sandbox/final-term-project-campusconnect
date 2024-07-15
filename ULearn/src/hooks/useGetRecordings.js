import { useUser } from "@clerk/clerk-react";
import { useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useEffect, useState } from "react";

export const useGetRecordings = () => {
  const [calls, setCalls] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const client = useStreamVideoClient();
  const { user } = useUser();

  useEffect(() => {
    const loadCalls = async () => {
        if(!client || !user?.id) return;

        setIsLoading(true);

        try {
            const { calls } = await client.queryCalls({
                sort: [{ field: 'starts_at', direction: -1 }],
                filter_conditions: {
                    starts_at: { $exists: true },
                    $or: [
                        { created_by_user_id: user.id},
                        { members: { $in: [user.id] }}
                    ]
                }
            });

            setCalls(calls);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    }

    loadCalls();
  }, [client, user?.id]);
  const callRecordings = calls;
  return { callRecordings, isLoading };
};
