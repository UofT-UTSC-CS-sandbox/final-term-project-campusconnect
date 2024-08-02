import React from 'react';
import { GoCheckCircleFill } from "react-icons/go";
import { GoXCircleFill } from "react-icons/go";
import MessageButton from '../message';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import { useUser } from "@clerk/clerk-react";

const AppointmentCard = ( props ) => {
    const navigate = useNavigate();
    const { isLoaded, user } = useUser();
    let newAppointmentStartTime = new Date(new Date(props.appointment.startTime).toLocaleString());
    let newAppointmentEndTime = new Date(new Date(props.appointment.endTime).toLocaleString());

    const showButton = (status) => {
        if (status == "Pending"){
            return (
                <div>
                <button className="w-fit mr-2">
                <GoCheckCircleFill  className='fill-green-600 size-7 ' onClick={handleCheckClick}/>
                </button>
                <button className="w-fit">
                    <GoXCircleFill className='fill-red-600 size-7' onClick={handleXClick}/>
                </button>
                </div>
            )
        }
    }
    const handleMessageClick = () => {
        navigate(`/chatRoom`, { state: { clerkid: props.appointment.otherClerkId, tutorname: props.appointment.otherName, tutorimage: props.appointment.otherImage } })
    }
   
    const handleCheckClick = async () => {
        
         if (props.appointment.status === "Pending"){ //user is tutor
            if (!isLoaded){
                return;
            }
            const tutorId = user?.id;
            //update status for student
            axios.patch("http://localhost:3001/updateAppointmentStatus", {clerkId: props.appointment.otherClerkId, otherId: tutorId, status: "Accepted"}) 
            .then((response) => {
                console.log(response.data);
              })
              .catch((error) => {
                console.error("Error accepting request:", error);
              });
            
            //update status for tutor
            axios.patch("http://localhost:3001/updateAppointmentStatus", {clerkId: tutorId, otherId: props.appointment.otherClerkId, status: "Accepted"}) 
            .then((response) => {
                console.log(response.data);
              })
              .catch((error) => {
                console.error("Error accepting request:", error);
              });
            
              const tutorEmail = String(user?.primaryEmailAddress);
              //update tutor availability
           axios.post("http://localhost:3001/updateAvailabilityAfterAccept", {newAppointmentStartTime, newAppointmentEndTime, tutorEmail})
              .then((response) => {
                console.log(response.data);
              })
                .catch((error) => {
                console.error("Error updating tutor availability:", error);
            });
        toast.success("Appointment accepted and availabilty updated!");
           
        }
    }
    const handleXClick = () => {
        console.log("X clicked");
        if (props.appointment.status === "Pending"){ 
            if (!window.confirm("Are you sure you want to decline this appointment?")) { 
                return; 
            }
            if (!isLoaded){
                return;
            }
            const tutorId = user?.id;
          
             axios.post("http://localhost:3001/deleteAppointment", {clerkId: props.appointment.otherClerkId, otherId: tutorId}  ) 
             .then((response) => {
                 console.log(response.data);
               })
               .catch((error) => {
                 console.error("Error deleting appointment:", error);
               });

            axios.post("http://localhost:3001/deleteAppointment", { clerkId: tutorId, otherId: props.appointment.otherClerkId}) 
             .then((response) => {
                 console.log(response.data);
               })
               .catch((error) => {
                 console.error("Error deleting appointment:", error);
               });
            toast.success("Appointment declined!");
        }
    }

    return (
        <div>
            <ToastContainer />
        <div className="bg-white h-full w-full flex justify-center">
            <div className="w-3/4 mt-10">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                        <img src={props.appointment.otherImage} alt="User Avatar" className="aspect-square object-cover size-12 rounded-full"/>
                        <div>
                            <p className="text-gray-800 font-semibold text-2xl">{props.appointment.otherName}</p>
                            <p className="text-gray-500 text-md"> {new Date(props.appointment.startTime).toLocaleString() + " - " + new Date(props.appointment.endTime).toLocaleString()}</p>
                        </div>
                    </div>
                    <div className="text-gray-500 cursor-pointer">
                        <div className='flex items-center gap-4'>
                        <MessageButton props={props.appointment.otherClerkId} handleMessageClick={handleMessageClick}></MessageButton>
                            {showButton(props.appointment.status)}
                            
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
        </div>
    );
};

export default AppointmentCard;