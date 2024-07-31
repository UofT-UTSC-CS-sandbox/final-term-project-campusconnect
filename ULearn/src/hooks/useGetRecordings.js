import { useUser } from "@clerk/clerk-react";
import { useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useEffect, useState } from "react";

/**
 * Custom hook: useGetRecordings
 * 
 * This hook is used to fetch call recordings data for the current user.
 * It returns the recordings data and a loading state.
 * 
 * @returns {Object} - An object containing the recordings data and loading state.
 * @returns {Array} return.callRecordings - The list of call recordings.
 * @returns {boolean} return.isLoading - The loading state.
 */
export const useGetRecordings = () => {
  // State to store the list of calls
  const [calls, setCalls] = useState([]);
  // State to store the loading state
  const [isLoading, setIsLoading] = useState(false);
  // Get the Stream Video client
  const client = useStreamVideoClient();
  // Get the current user
  const { user } = useUser();

  // useEffect hook to fetch calls when the component mounts or client/user.id changes
  useEffect(() => {
    // Async function to load calls
    const loadCalls = async () => {
      // If client or user.id is not available, return early
      if (!client || !user?.id) return;

      // Set loading state to true
      setIsLoading(true);

      try {
        // Make an API call to fetch calls for the user
        const { calls } = await client.queryCalls({
          sort: [{ field: 'starts_at', direction: -1 }], // Sort by start date in descending order
          filter_conditions: {
            starts_at: { $exists: true }, // Only include calls that have a start date
            $or: [
              { created_by_user_id: user.id }, // Calls created by the user
              { members: { $in: [user.id] } } // Calls where the user is a member
            ]
          }
        });

        // Update the calls state with the fetched data
        setCalls(calls);
      } catch (error) {
        // Log any errors to the console
        console.error(error);
      } finally {
        // Set loading state to false after the data is fetched
        setIsLoading(false);
      }
    };

    // Call the loadCalls function
    loadCalls();
  }, [client, user?.id]); // Dependency array to re-run the effect when client or user.id changes

  // Alias for calls state to maintain consistency with the hook's purpose
  const callRecordings = calls;

  // Return the recordings data and loading state
  return { callRecordings, isLoading };
};