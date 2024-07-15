import React from "react";
import RecordingList from "../../components/RecordingList";
import Nav from "../../components/Nav/Nav";

/**
 * Recordings Component
 * 
 * This component serves as a container for the RecordingList component.
 * It is responsible for rendering the list of recordings.
 */
function Recordings() {
  return (
    <>
      <Nav />
        <div className="p-5">
      <h1 className="text-4xl m-2 font-bold">Recordings</h1>
      <RecordingList />
      </div>
    </>
  )
}

export default Recordings;
