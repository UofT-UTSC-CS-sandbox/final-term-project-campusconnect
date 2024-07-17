/**
 * @file createCallButton.jsx
 * @desc This file contains the CreateCallButton component, which is responsible for creating a call/meeting.
 */

import { useUser } from "@clerk/clerk-react";
import { useStreamVideoClient } from "@stream-io/video-react-sdk";
import axios from "axios";
import { Phone } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useChannelStateContext, useChatContext } from 'stream-chat-react';
import "react-toastify/dist/ReactToastify.css";

/**
 * CreateCallButton component.
 * This component is responsible for creating a call/meeting.
 *
 * @returns {JSX.Element} The CreateCallButton component.
 */
const CreateCallButton = () => {
  let navigate = useNavigate();
  const { channel } = useChatContext();
  const { members } = useChannelStateContext();
  const { user } = useUser();
  const client = useStreamVideoClient();
  const [isTutor, setIsTutor] = useState(false);
  const [tutorEmail, setTutorEmail] = useState("");
  const [values, setValues] = useState({
    dateTime: new Date(),
    description: "",
    link: "",
  });
  const [callDetails, setCallDetails] = useState(null);

  useEffect(() => {
    const email = String(user.primaryEmailAddress.emailAddress);
    axios
      .post("http://localhost:3001/findTutor", { email })
      .then((response) => {
        if (response.data === "found") {
          setIsTutor(true);
          setTutorEmail(email);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, [user]);

  const handleCreate = async () => {
    if (!client || !user || !channel) {
      return;
    }

    // Create a new call with the user as host
    try {
      const id = crypto.randomUUID();
      const call = client.call("default", id);
      if (!call) throw new Error("Failed to create call");
      const startsAt = new Date(Date.now()).toISOString(); // Start the call immediately
      const description = values.description || "No description";
      const membersArray = Object.values(members).map(member => ({ user_id: member.user_id }));
      console.log(membersArray);
      await call.getOrCreate({
        // Create the call
        data: {
          starts_at: startsAt,
          custom: {
            description,
          },
          members: membersArray,
        },
      });

      setCallDetails(call);

      if (!values.description) {
        const message = await channel.sendMessage({
          text: `Call created, [click here to join](http://localhost:5173/meeting/${call.id}?tutorEmail=${encodeURIComponent(tutorEmail)})`,
        });
        //console.log(tutorEmail);
        navigate(`/meeting/${call.id}?tutorEmail=${encodeURIComponent(tutorEmail)}`); // Pass tutorEmail as URL parameter
      }
    } catch (error) {
      toast.error("Error: Failed to create meeting");
    }
  };

  if (!isTutor) {
    return;
  }
  return (
    <div className="mr-12">
      <Phone
        color="black"
        className="cursor-pointer"
        size={24}
        onClick={handleCreate}
      />
    </div>
  );
};

export default CreateCallButton;
