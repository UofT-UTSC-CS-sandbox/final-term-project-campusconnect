import React from "react";
import { IoIosPlay, IoIosCopy } from "react-icons/io";

/**
 * MeetingCard Component
 * 
 * This component displays a card with meeting details including title, date,
 * and buttons to play the recording and copy the link to the clipboard.
 * 
 * @param {Object} props - The properties object.
 * @param {string} props.title - The title of the meeting.
 * @param {string} props.date - The date of the meeting.
 * @param {function} props.handleClick - The function to call when the play button is clicked.
 * @param {string} props.link - The link to the meeting recording.
 */
const MeetingCard = ({ title, date, handleClick, link, transcription }) => {
  return (
    <section className="flex min-h-[200px] w-full flex-col justify-between rounded-[14px] bg-slate-100 px-5 py-8">
      <article className="flex flex-col gap-5">
        <div className="flex justify-between flex-col gap-2">
          {/* Display the meeting title */}
          <h1 className="text-2xl font-bold">{title}</h1>
          {/* Display the meeting date */}
          <p className="text-base font-normal">{date}</p>
        </div>
      </article>
      <article className="className=flex justify-center relative">
        <div className="flex flex-wrap gap-2">
          {/* Button to play the recording */}
          <button
            onClick={handleClick}
            className="rounded-lg bg-slate-300 px-6 py-2 flex items-center"
          >
            <IoIosPlay alt="play" size={20} />
            Play
          </button>
          {/* Button to copy the recording link to the clipboard */}
          <button
            onClick={() => {
              navigator.clipboard.writeText(link);
            }}
            className="rounded-lg bg-dark-4 bg-slate-200 px-6 py-2 flex items-center gap-1"
          >
            <IoIosCopy alt="copy" size={20} />
            Copy Link
          </button>
        </div>
      </article>
    </section>
  );
};

export default MeetingCard;