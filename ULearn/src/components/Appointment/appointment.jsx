import React from 'react';
import { GoCheckCircleFill } from "react-icons/go";
import { GoXCircleFill } from "react-icons/go";

const Appointment = ( props ) => {
    return (
        <div className="bg-white w-full h-1/12 grid-cols-3 grid">
            <span className='py-5 px-5 w-full min-w-full col-start-1 col-span-2 grid grid-rows-2'>
                <img src={props.image} alt={props.name} className="review-user-image aspect-circle object-cover">
                </img>
                <span className="text-lg text-bold">
                    {props.name}
                </span>
                <div className='row-start-2 row-span-1'>
                    {new Date(props.starttime).toLocaleDateString() + " - " + new Date(props.endtime).toLocaleDateString()}
                    <div>
                    {props.topic}
                    </div>
                    
                </div>
                <div className='col-start-3 col-span-1 float-right absolute-right-0'>  
                    <div>
                        <GoCheckCircleFill  className='fill-green-600 right-5 size-5'/>
                        <GoXCircleFill className='fill-red-600 object-right size-5'/>
                    </div> 
                </div>
            </span>   
        </div>        
    );
};

export default Appointment;