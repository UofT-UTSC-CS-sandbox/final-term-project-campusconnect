import React from 'react';
import { GoCheckCircleFill } from "react-icons/go";
import { GoXCircleFill } from "react-icons/go";
import MessageButton from '../message';


const AppointmentCard = ( props ) => {
    const handleMessageClick = () => {
        navigate(`/chatRoom`, { state: { clerkId: props.appointment.clerkId, tutorname: props.appointment.name, tutorimage: props.appointment.image } })
    }
    return (
        <div className="bg-white h-full w-full flex justify-center">
            <div className="w-3/4 mt-10">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                        <img src={props.appointment.image} alt="User Avatar" className="aspect-square object-cover size-12 rounded-full"/>
                        <div>
                            <p className="text-gray-800 font-semibold text-2xl">{props.appointment.name}</p>
                            <p className="text-gray-500 text-md"> {new Date(props.appointment.starttime).toLocaleDateString() + " - " + new Date(props.appointment.endtime).toLocaleDateString()}</p>
                        </div>
                    </div>
                    <div className="text-gray-500 cursor-pointer">
                        <div className='flex items-center gap-4'>
                        <MessageButton props={props.appointment.clerkId} handleMessageClick={handleMessageClick}></MessageButton>
                            <button className="w-fit mr-2">
                                <GoCheckCircleFill  className='fill-green-600 size-7 '/>
                            </button>
                            <button className="w-fit">
                                <GoXCircleFill className='fill-red-600 size-7'/>
                            </button>
                        </div>

                    </div>
                </div>

                <div className="mb-4">
                    <p className="text-gray-800 font-semibold text-xl">
                        {props.appointment.topic}
                    </p>
                </div>
                <div className="mb-4">
                    <p className="text-gray-800">
                        {props.appointment.description}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AppointmentCard;