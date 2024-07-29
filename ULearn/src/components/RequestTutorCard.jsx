import { useUser } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import axios from "axios";

function RequestTutorCard({ toggle, tutorname, tutoremail }) {
  const { user } = useUser();
  const studentEmail = String(user.primaryEmailAddress);
  const [visible, setVisible] = useState(false);
  const [formData, setFormData] = useState({
    topic: '',
    description: '',
    start: '',
    end: ''
  });

  useEffect(() => {
    setVisible(true);
  }, []);

  const handleOverlayClick = () => {
    toggle();
  };

  const handlePopupClick = (e) => {
    e.stopPropagation();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const requestData = {
      tutorEmail: tutoremail, // Replace with actual tutor email
      requests: [
        {
          studentEmail: studentEmail, // Replace with actual student email
          startTime: formData.start,
          endTime: formData.end,
          status: 'pending', // Initial status
          topic: formData.topic,
          description: formData.description
        }
      ]
    };

    try {
      const response = await axios.post('http://localhost:3001/request-tutor', requestData);
      if (response.status === 200) {
        // Handle success
        console.log('Request sent successfully');
        toggle();
      } else {
        // Handle error
        console.error('Failed to send request');
      }
    } catch (error) {
      console.error('Error:', error);
    }
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
        <form className="flex flex-col gap-4 p-4" onSubmit={handleSubmit}>
          <h1 className="text-2xl">Request Tutoring From {tutorname}</h1>
          <label htmlFor="topic">Topic: *</label>
          <input
            type="text"
            id="topic"
            name="topic"
            required
            className="border-2 p-2"
            value={formData.topic}
            onChange={handleChange}
          />
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            className="border-2 p-2 h-32"
            value={formData.description}
            onChange={handleChange}
          />
          <label htmlFor="start">Start Time:</label>
          <input
            type="datetime-local"
            id="start"
            name="start"
            required
            className="border-2 p-2"
            value={formData.start}
            onChange={handleChange}
          />
          <label htmlFor="end">End Time:</label>
          <input
            type="datetime-local"
            id="end"
            name="end"
            required
            className="border-2 p-2"
            value={formData.end}
            onChange={handleChange}
          />
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