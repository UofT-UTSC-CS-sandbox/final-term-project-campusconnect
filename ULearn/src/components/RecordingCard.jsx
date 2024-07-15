import React from "react";
import { IoIosPlay, IoIosCopy } from "react-icons/io";

const MeetingCard = ({ title, date, handleClick, link, transcription }) => {
  return (
    <section className="flex min-h-[258px] w-full flex-col justify-between rounded-[14px] bg-slate-100 px-5 py-8">
      <article className="flex flex-col gap-5">
        <div className="flex justify-between flex-col gap-2">
          <h1 className="text-2xl font-bold">{title}</h1>
          <p className="text-base font-normal">{date}</p>
        </div>
      </article>
      <article className="className=flex justify-center relative">
        <div className="flex gap-2">
          <button onClick={handleClick} className="rounded bg-blue-1 px-6">
            <IoIosPlay alt="play" size={20} />
            Play
          </button>
          <button
            onClick={() => {
              navigator.clipboard.writeText(link);
            }}
            className="bg-dark-4 px-6"
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
