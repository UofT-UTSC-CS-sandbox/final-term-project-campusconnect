import { useUser } from "@clerk/clerk-react";
import { useEffect, useState, useRef } from "react";
import axios from "axios";

function RequestTutorCard({ toggle, tutorname, tutoremail }) {
  const { user } = useUser();
  const [visible, setVisible] = useState(false);
  const [availabilities, setAvailabilities] = useState([]);
  const [dates, setDates] = useState([]);
  const [times, setTimes] = useState([]);
  const [availableDate, setAvailableDate] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [topic, setTopic] = useState("");
  const [description, setDescription] = useState("");
  const [availableTime, setAvailableTime] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const formRef = useRef(null);

  useEffect(() => {
    // Check form validity on initial render
    setIsButtonDisabled(!formRef.current.checkValidity());
  }, []);

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
          const availabilityArray = response.data.availableTimes.map(
            (time) => ({
              startTime: new Date(time.startTime).toLocaleString(),
              endTime: new Date(time.endTime).toLocaleString(),
            })
          );

          setAvailabilities(availabilityArray);

          const datesAvailable = response.data.availableTimes.map((time) => ({
            startTime: new Date(time.startTime).toLocaleDateString(),
            endTime: new Date(time.endTime).toLocaleDateString(),
          }));

          const uniqueDates = Array.from(
            new Set(datesAvailable.map((a) => a.startTime))
          ).map((startTime) => {
            return datesAvailable.find((a) => a.startTime === startTime);
          });

          uniqueDates.sort(
            (a, b) => new Date(a.startTime) - new Date(b.startTime)
          );

          const currentDate = new Date();
          currentDate.setHours(0, 0, 0, 0);
          const filteredDates = uniqueDates.filter(
            (date) => new Date(date.startTime) >= currentDate
          );

          setDates(filteredDates);

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

  const handleFormChange = () => {
    setIsButtonDisabled(!formRef.current.checkValidity());
  };

  //Prevents the popup from closing when clicking inside the popup
  const handlePopupClick = (e) => {
    e.stopPropagation();
  };

  const handleDateChange = (event) => {
    const selectedDate = new Date(event.target.value); // Convert to Date object
    setAvailableDate(selectedDate);

    const availableTimes = availabilities
      .filter((availability) => {
        const availabilityDate = new Date(availability.startTime); // Convert to Date object
        return availabilityDate.toDateString() === selectedDate.toDateString(); // Compare dates
      })
      .flatMap((availability) => {
        const startDate = new Date(availability.startTime);
        const endDate = new Date(availability.endTime);
        const intervals = [];

        let currentStart = startDate;
        while (currentStart < endDate) {
          let currentEnd = new Date(currentStart);
          currentEnd.setHours(currentEnd.getHours() + 1);

          if (currentEnd > endDate) {
            currentEnd = endDate;
          }

          intervals.push([
            currentStart.toLocaleTimeString(),
            currentEnd.toLocaleTimeString(),
          ]);
          currentStart = currentEnd;
        }

        return intervals;
      });

    setTimes(availableTimes);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const [startTime, endTime] = availableTime.split("|");

    const selectedStartDate = new Date(availableDate);
    const selectedEndDate = new Date(availableDate);

    const [startHour, startMinute, startPeriod] = startTime.split(/[: ]/);
    const [endHour, endMinute, endPeriod] = endTime.split(/[: ]/);

    selectedStartDate.setHours(
      startPeriod === "PM" && startHour !== "12"
        ? parseInt(startHour) + 12
        : parseInt(startHour),
      parseInt(startMinute)
    );
    selectedEndDate.setHours(
      endPeriod === "PM" && endHour !== "12"
        ? parseInt(endHour) + 12
        : parseInt(endHour),
      parseInt(endMinute)
    );

    const start = selectedStartDate;
    const end = selectedEndDate;

    let tutorData = {};
    try {
      tutorData = await axios.get("http://localhost:3001/getUserByEmail", {
        params: { email: tutoremail },
      });
    } catch (error) {
      console.error("Error fetching user:", error);
    }
    const tutorStudentData = {
      userClerkId: tutorData.data.clerkId,
      userName: tutorData.data.name,
      appointments: [
        {
          otherClerkId: user.id,
          otherName: user.fullName,
          otherImage: user.imageUrl,
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
          otherImage: tutorData.data.image,
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
        <form
          className="flex flex-col gap-4 p-4"
          onSubmit={handleSubmit}
          onChange={handleFormChange}
          ref={formRef}
        >
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
          <label htmlFor="time">Date: *</label>
          {!dates ? (
            <p>No dates available</p>
          ) : (
            <select
              id="time"
              name="start"
              required
              className="border-2 p-2 rounded-sm"
              onChange={handleDateChange}
              defaultValue=""
            >
              <option value="" disabled>
                Select a date
              </option>
              {dates.map((date, index) => (
                <option key={index} value={`${date.startTime}`}>
                  {`${date.startTime}`}
                </option>
              ))}
            </select>
          )}
          <label htmlFor="time">Time: *</label>
          {!availableDate ? (
            <select
              id="time"
              name="time"
              required
              className="border-2 p-2 rounded-sm text-gray-400"
              disabled
            >
              <option>Please select a date first</option>
            </select>
          ) : (
            <select
              id="time"
              name="time"
              required
              className="border-2 p-2 rounded-sm"
              onChange={(e) => setAvailableTime(e.target.value)}
            >
              {times.map((time, index) => (
                <option key={index} value={time.join("|")}>
                  {`${time[0]} - ${time[1]}`}
                </option>
              ))}
            </select>
          )}
          <button
            type="submit"
            className={`p-2 rounded-lg ${
              isButtonDisabled ? "bg-gray-300" : "bg-blue-500 text-white"
            }`}
            disabled={isButtonDisabled}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default RequestTutorCard;
