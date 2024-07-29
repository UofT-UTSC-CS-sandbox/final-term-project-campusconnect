import { useEffect, useState } from "react";

function RequestTutorCard({ toggle, tutorname }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    setVisible(true);
  }, []);

  const handleOverlayClick = () => {
    toggle();
  };

  const handlePopupClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center transition-opacity duration-300 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
      onClick={handleOverlayClick}
    >
      <div className="absolute inset-0 bg-black bg-opacity-40"></div>
      <div
        className="relative flex flex-col bg-white shadow-lg rounded-lg p-2 z-10"
        onClick={handlePopupClick}
      >
        <form className="flex flex-col gap-4 p-4 ">
          <h1 className="text-2xl">Request Tutoring From {tutorname}</h1>
          <label htmlFor="topic">Topic: *</label>
          <input
            type="text"
            id="topic"
            name="topic"
            required
            className="border-2 p-2"
          />
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            className="border-2 p-2 h-32"
          />
          <label htmlFor="start">Start Time:</label>
          <input
            type="datetime-local"
            id="start"
            name="start"
            required
            className="border-2 p-2"
          ></input>
          <label htmlFor="end">End Time:</label>
          <input
            type="datetime-local"
            id="end"
            name="end"
            required
            className="border-2 p-2"
          ></input>
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded-lg"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default RequestTutorCard;
