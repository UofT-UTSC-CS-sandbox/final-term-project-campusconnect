import React from "react";
import RecordingList from "../../components/RecordingList";
import Nav from "../../components/Nav/Nav";

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
