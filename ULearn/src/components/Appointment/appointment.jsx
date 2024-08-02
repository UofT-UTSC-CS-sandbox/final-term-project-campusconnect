import React from 'react';
import { GoCheckCircleFill } from "react-icons/go";
import { GoXCircleFill } from "react-icons/go";

const Appointment = ( props ) => {
    return (
        <div className="bg-white w-full h-1/12 flex items-center justify-center">
  
    <div className="w-full grid grid-cols-5 mt-5">
        
        <div className="object-center ml-5 "> 
            <img src={props.image} alt={props.name} className="rounded-full aspect-square object-cover size-12"/>
        </div>
        
        <div className="col-span-4 flex flex-col gap-4"> 
        <div className="text-gray-800 grid grid-cols-3 gap-3 mt-2">
            <div className="text-xl font-semibold col-start-1 col-span-2">
                {props.name}
            </div>
            <div className='col-start-3 col-span-1'>
            </div>
            
        </div>
        
        <div className="text-gray-800 text-md flex flex-col"> 
            <div className=" text-gray-500">
                {new Date(props.starttime).toLocaleDateString() + " - " + new Date(props.endtime).toLocaleDateString()}
            </div>
            <div className='mb-2'>
                {props.topic}
            </div>
            
        </div>
        
        </div>
        
    </div>
</div>
    );
};

export default Appointment;