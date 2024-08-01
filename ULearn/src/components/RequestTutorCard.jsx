import { useUser } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import axios from "axios";

function RequestTutorCard({ toggle, tutorname, tutoremail }) {
  const { user } = useUser();
  const [visible, setVisible] = useState(false);
  const [availabilities, setAvailabilities] = useState([]);
  const [availableTime, setAvailableTime] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [topic, setTopic] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (!isLoading) {
      setVisible(true);
      return;
    }
    const fetchAvailability = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/getAvailability",
          {
            params: { tutoremail },
          }
        );
        if (response.status === 200) {
          const formattedAvailabilities = response.data.availableTimes.map(
            (time) => ({
              startTime: new Date(time.startTime).toLocaleString(),
              endTime: new Date(time.endTime).toLocaleString(),
            })
          );
          setAvailabilities(formattedAvailabilities);

          setIsLoading(false);
        } else {
          console.error("Failed to fetch availability ", response);
        }
      } catch (error) {
        console.error("Error fetching availability:", error);
      }
    };

    if (tutoremail) {
      fetchAvailability();
    } else {
      console.error("Tutor email is not defined");
    }
  }, [isLoading]);

  const handleToggle = () => {
    toggle();
  };

  //Prevents the popup from closing when clicking inside the popup
  const handlePopupClick = (e) => {
    e.stopPropagation();
  };

  const handleTimeChange = (event) => {
    setAvailableTime(event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const [start, end] = availableTime.split("|");
    let tutorData = {};
    try {
      tutorData = await axios.get("http://localhost:3001/getUserByEmail", {
        params: { email: tutoremail },
      });
    } catch (error) {
      console.error("Error fetching user:", error);
    }
    console.log(tutorData);
    const tutorStudentData = {
      userClerkId: tutorData.data.clerkId,
      userName: tutorData.data.name,
      appointments: [
        {
          otherClerkId: user.id,
          otherName: user.fullName,
          startTime: start,
          endTime: end,
          status: "Pending",
          topic: topic,
          description: description,
        },
      ],
    };
    try {
      const response = await axios.post(
        "http://localhost:3001/bookAppointment",
        tutorStudentData
      );
      if (response.status === 200) {
        // Handle success
        console.log("Request sent successfully");
      } else {
        // Handle error
        console.error("Failed to send request");
      }
    } catch (error) {
      console.error("Error:", error);
    }

    const studentTutorData = {
      userClerkId: user.id,
      userName: user.fullName,
      appointments: [
        {
          otherClerkId: tutorData.data.clerkId,
          otherName: tutorData.data.name,
          startTime: start,
          endTime: end,
          status: "Waiting",
          topic: topic,
          description: description,
        },
      ],
    };
    try {
      const response = await axios.post(
        "http://localhost:3001/bookAppointment",
        studentTutorData
      );
      if (response.status === 200) {
        // Handle success
        console.log("Request sent successfully");
        toggle();
      } else {
        // Handle error
        console.error("Failed to send request");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center transition-opacity duration-300 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
      onClick={handleToggle}
    >
       <div className="absolute inset-0 bg-black bg-opacity-40"></div>
      <div
        className="relative flex flex-col bg-white shadow-lg rounded-lg p-2 z-10"
        onClick={handlePopupClick}
      >
        <button
          className="absolute top-1 right-3 text-lg text-gray-300"
          onClick={handleToggle}
        >
          x
        </button>
        <form className="flex flex-col gap-4 p-4" onSubmit={handleSubmit}>
          <h1 className="text-2xl">Request Tutoring From {tutorname}</h1>
          <label htmlFor="topic">Topic: *</label>
          <input
            type="text"
            id="topic"
            name="topic"
            required
            className="border-2 p-2 rounded-sm"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
          />
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            className="border-2 p-2 h-32 rounded-sm"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <label htmlFor="time">Appointment Time: *</label>
          {!availabilities ? (
            <p>No available times</p>
          ) : (
            <select
              id="time"
              name="start"
              required
              className="border-2 p-2 rounded-sm"
              onChange={handleTimeChange}
              defaultValue=""
            >
              <option value="" disabled>
                Select a time
              </option>
              {availabilities.map((availability, index) => (
                <option
                  key={index}
                  value={`${availability.startTime}|${availability.endTime}`}
                >
                  {`${availability.startTime} - ${availability.endTime}`}
                </option>
              ))}
            </select>
          )}
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
