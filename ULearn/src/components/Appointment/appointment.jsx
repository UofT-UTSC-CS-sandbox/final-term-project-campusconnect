import React from 'react';
import { IoIosCheckmarkCircle } from "react-icons/io";
import { GoXCircleFill } from "react-icons/go";

const Appointment = ( props ) => {
    return (
        <div>
            <div className="bg-white shadow-md w-1/3 h-1/12 px-5 py-5 my-5 mx-5 grid-cols-3 grid-rows-2">
                <span className='flex w-full min-w-full col-start-1 col-span-2'>
                    <img src={props.image} alt={props.name} className="review-user-image aspect-circle object-cover">
                    </img>
                    <span className="text-lg text-bold">
                        {props.name}
                    </span>
                <div className='grid col-start-3 col-span-1'>   
                    <IoIosCheckmarkCircle className='fill-green-600 right-5'/>
                    <GoXCircleFill className='fill-red-600 object-right'/>
                </div>
                
                </span>   
                <div>
                    {new Date(props.starttime).toLocaleDateString() + " - " + new Date(props.endtime).toLocaleDateString()}
                </div>
                <div>
                    {props.topic}
                </div>
                <div>
                    {props.desc}
                </div>  
            </div>
        </div>
        
    );
};

export default Appointment;