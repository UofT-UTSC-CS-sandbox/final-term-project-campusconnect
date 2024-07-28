import { useState } from "react";
import RequestTutorCard from "./RequestTutorCard";

const RequestTutorButton = () => {
  const [display, setDisplay] = useState(false);

  const toggleDisplay = () => {
    setDisplay(!display);
  };

  return (
    <>
      <button className="block border-2" onClick={toggleDisplay}>
        Request
      </button>
      {display ? <RequestTutorCard toggle={toggleDisplay} /> : null}
    </>
  );
};

export default RequestTutorButton;
