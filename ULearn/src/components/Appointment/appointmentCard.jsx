import React from 'react';
import { GoCheckCircleFill } from "react-icons/go";
import { GoXCircleFill } from "react-icons/go";


const AppointmentCard = ( props ) => {
    return (
        <div className='bg-white h-full w-full' >
            <span className='py-5 px-5 flex w-full min-w-full col-start-1 col-span-2'>
                <img src={props.appointment.image} alt={props.appointment.name} className="review-user-image aspect-circle object-cover">
                </img>
                <span className="text-lg text-bold">
                    {props.appointment.name}
                </span>
            <div className='col-start-3 col-span-1'>   
                <GoCheckCircleFill className='fill-green-600 right-5'/>
                <GoXCircleFill className='fill-red-600 object-right'/>
            </div>
            
            </span>   
            <div className='px-5'>
                {new Date(props.appointment.starttime).toLocaleDateString() + " - " + new Date(props.appointment.endtime).toLocaleDateString()}
            </div>
            <div className='px-5'>
                Topic: 
                {props.appointment.topic}
            </div>
            <div className='px-5'>
                Description: 
                {props.appointment.description}
            </div>  
        </div>
        
    );
};

export default AppointmentCard;