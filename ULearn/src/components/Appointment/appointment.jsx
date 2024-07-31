import React from 'react';
import { GoCheckCircleFill } from "react-icons/go";
import { GoXCircleFill } from "react-icons/go";

const Appointment = ( props ) => {
    return (
        <div class="bg-white w-full h-1/12 flex items-center justify-center">
  
    <div class="w-full grid grid-cols-5 mt-5">
        
        <div class="object-center ml-5 "> 
            <img src={props.image} alt={props.name} className="rounded-full aspect-square object-cover size-12"/>
        </div>
        
        <div class="col-span-4 flex flex-col gap-4"> 
        <div class="text-gray-800 grid grid-cols-3 gap-3">
            <div class="text-2xl font-semibold col-start-1 col-span-2">
                {props.name}
            </div>
            <div className='col-start-3 col-span-1'>
            <button class="w-fit mr-2">
                <GoCheckCircleFill  className='fill-green-600 size-7 '/>
            </button>
            <button class="w-fit">
                <GoXCircleFill className='fill-red-600 size-7'/>
            </button>
            </div>
            
        </div>
        
        <div class="text-gray-800 flex flex-col"> 
            <div class="italic">
                {new Date(props.starttime).toLocaleDateString() + " - " + new Date(props.endtime).toLocaleDateString()}
            </div>
            <div>
                {props.topic}
            </div>
            
        </div>
        
        </div>
        
    </div>
</div>
    );
};

export default Appointment;