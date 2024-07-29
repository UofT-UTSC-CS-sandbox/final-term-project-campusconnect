import { useState } from "react";
import RequestTutorCard from "./RequestTutorCard";

const RequestTutorButton = ({tutorname}) => {
  const [display, setDisplay] = useState(false);

  const toggleDisplay = () => {
    setDisplay(!display);
  };

  return (
    <>
      <button className="block border-2" onClick={toggleDisplay}>
        Request
      </button>
      {display ? <RequestTutorCard toggle={toggleDisplay} tutorname={tutorname} /> : null}
    </>
  );
};

export default RequestTutorButton;
