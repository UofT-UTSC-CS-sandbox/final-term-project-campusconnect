import React from "react";
import { useState, useEffect } from "react";
import { useGetRecordings } from "../hooks/useGetRecordings";
import RecordingCard from "./RecordingCard";
import { useNavigate } from "react-router-dom";

function RecordingList() {
  const { callRecordings, isLoading } = useGetRecordings();
  const [recordings, setRecordings] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecordings = async () => {
      const callData = await Promise.all(
        callRecordings.map((meeting) => meeting.queryRecordings()) ?? []
      );

      const recordings = callData
        .filter((call) => call.recordings.length > 0)
        .flatMap((call) => call.recordings);

      setRecordings(recordings);
    };

    fetchRecordings();
  }, [callRecordings]);

  if (isLoading) return <h1>Loading...</h1>;
  return (
    <div className="grid grid-cols-1 gap-5">
      {recordings && recordings.length > 0 ? (
        recordings.map((meeting, index) => (
          <>
            <RecordingCard
              key={`${meeting.id}-${index}`}
              title={meeting.filename?.substring(0, 20) || "No Title"}
              date={new Date(meeting.start_time).toLocaleString()}
              link={meeting.url}
              handleClick={() => window.open(`${meeting.url}`, "_blank")}
            />
          </>
        ))
      ) : (
        <h1>No Recordings Found</h1>
      )}
      ;
    </div>
  );
}

export default RecordingList;
