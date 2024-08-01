import { useState } from "react";
import RequestTutorCard from "./RequestTutorCard";

const RequestTutorButton = ({tutorname , tutoremail}) => {
  const [display, setDisplay] = useState(false);

  const toggleDisplay = () => {
    setDisplay(!display);
  };

  return (
    <>
      <button className="block p-2 bg-blue-500 rounded-md text-white" onClick={toggleDisplay}>
        Book
      </button>
      {display ? <RequestTutorCard toggle={toggleDisplay} tutorname={tutorname} tutoremail={tutoremail}/> : null}
    </>
  );
};

export default RequestTutorButton;
