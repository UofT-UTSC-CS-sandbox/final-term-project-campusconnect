import { useEffect, useState } from "react";

function RequestTutorCard({ toggle }) {
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
        <form className="flex flex-col gap-4 p-4">
            <label htmlFor="topic">Topic:</label>
            <input type="text" id="topic" name="topic" required className="border-2 p-2"/>
            </form>
        <button onClick={toggle}>ok</button>
      </div>
    </div>
  );
}

export default RequestTutorCard;
