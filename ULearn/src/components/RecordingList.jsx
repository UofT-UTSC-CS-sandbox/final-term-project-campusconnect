import React from "react";
import { useState, useEffect } from "react";
import { useGetRecordings } from "../hooks/useGetRecordings";
import RecordingCard from "./RecordingCard";
import { useNavigate } from "react-router-dom";

/**
 * RecordingList Component
 * 
 * This component fetches and displays a list of recordings.
 * It uses the `useGetRecordings` hook to fetch the recordings data
 * and displays each recording using the `RecordingCard` component.
 */
function RecordingList() {
    // Destructure the callRecordings function and isLoading state from the useGetRecordings hook
    const { callRecordings, isLoading } = useGetRecordings();
    
    // State to store the list of recordings
    const [recordings, setRecordings] = useState([]);
    
    // Hook to navigate programmatically
    const navigate = useNavigate();
  
    // useEffect hook to fetch recordings when the component mounts or callRecordings changes
    useEffect(() => {
      // Async function to fetch recordings
      const fetchRecordings = async () => {
        // Fetch data for each meeting by calling queryRecordings on each meeting object
        const callData = await Promise.all(
          callRecordings.map((meeting) => meeting.queryRecordings()) ?? []
        );
  
        // Filter out calls with no recordings and flatten the array of recordings
        const recordings = callData
          .filter((call) => call.recordings.length > 0)
          .flatMap((call) => call.recordings);
  
        // Update the recordings state with the fetched recordings
        setRecordings(recordings);
      };
  
      // Call the fetchRecordings function
      fetchRecordings();
    }, [callRecordings]); // Dependency array to re-run the effect when callRecordings changes
  
    // Render the component 
  if (isLoading) return <h1>Loading...</h1>;
  return (
    <div className="grid gap-5">
      {recordings && recordings.length > 0 ? (
        recordings.map((meeting, index) => (
            <RecordingCard
              key={`${meeting.id}-${index}`}
              title={meeting.filename?.substring(0, 25) || "No Title"}
              date={new Date(meeting.start_time).toLocaleString()}
              link={meeting.url}
              handleClick={() => window.open(`${meeting.url}`, "_blank")}
          />
        ))
      ) : (
        <h1>No Recordings Found</h1>
      )}
    </div>
  );
}

export default RecordingList;
