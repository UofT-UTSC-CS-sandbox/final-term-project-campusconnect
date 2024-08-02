import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useUser } from '@clerk/clerk-react';
import Nav from '../../components/Nav/Nav';
import { Tab, Tabs } from '../../components/tabs';
import AppointmentList from '../../components/Appointment/appointmentList.jsx'

const AppointmentsPage = () => {
    const { isLoaded, user } = useUser();
    const [appointments, setAppointments] = useState([]);
    const [pending, setPending] = useState([]);
    const [archive, setArchive] = useState([]);  

    useEffect(() => {
        const getAppointments = async () => {
            if (user && user.id){
                try {
                    const response = await axios.get(`http://localhost:3001/appointments/${user.id}`); //get a users appointment
                    const data = response.data[0]?.appointments || [];
                    if (pending || appointments || archive){ //if there was already appts in the previous state, clear it
                        setPending([]);
                        setAppointments([]);
                        setArchive([]);
                    }
                    data.map(appointment => ( //map each appt into their correct category
                        assignAppointment(appointment)
                    ))
                } catch (error) {
                    console.error('Error fetching appointments:', error);
                }
            }
        };

        const assignAppointment = (appointment) => { //checks for the status of an appointment, and assigns them to the appropriate state
            if (appointment.status == "Pending" || appointment.status == "Waiting"){
                setPending(prevPending => [...prevPending, appointment]);
            }
            else if (appointment.status == "Accepted") {
                const currentDate = new Date();
                const appointmentDate = new Date(appointment.endTime);
                console.log("appointment date", appointmentDate);
                console.log("current date", currentDate);
                if (appointmentDate > currentDate) {
                    setAppointments(prevAppointments => [...prevAppointments, appointment]);
                }
                else if (appointmentDate <= currentDate){
                    if (user && user.id){
                        axios.patch("http://localhost:3001/updateAppointmentStatus", {clerkId: appointment.otherClerkId, otherId: user.id, status: "Archived"}) 
                        .then((response) => {
                            console.log(response.data);
                        })
                        .catch((error) => {
                            console.error("Error archiving request:", error);
                        });
                        axios.patch("http://localhost:3001/updateAppointmentStatus", {clerkId: user.id, otherId: appointment.otherClerkId, status: "Archived"}) 
                        .then((response) => {
                            console.log(response.data);
                        })
                        .catch((error) => {
                            console.error("Error archiving request:", error);
                        });
                    }
                }
            }
            else if (appointment.status == "Archived"){
                setArchive(prevArchive => [...prevArchive, appointment]);
            }
        }
        
        getAppointments();
    }, [user, isLoaded]);
    return (
        <div className='bg-white w-full h-fit min-h-full min-w-screen '> 
            <div className='border-gray-300 border-b-2 bg-white w-screen shadow-lg min-w-full sticky top-0'>
                <Nav></Nav>
            </div>
            <div className='flex justify-center items-center my-5 pt-5'>
                <Tabs className='bg-gray-200'>
                    <Tab label="Appointments">
                        <div className='overflow-y-scroll max-h-screen bg-gray-50 min-h-screen'>
                            <AppointmentList
                                appointments={appointments}
                            >
                            </AppointmentList>
                        </div>
                    </Tab>
                    <Tab label="Pending">
                        <div className='overflow-y-scroll max-h-screen bg-gray-50 min-h-screen'>
                            <AppointmentList
                                appointments={pending}
                            >
                            </AppointmentList>
                        </div>
                    </Tab>
                    <Tab label="Archive">
                        <div className='overflow-y-scroll max-h-screen bg-gray-50 min-h-screen'>
                            <AppointmentList
                                appointments={archive}
                            >
                            </AppointmentList>
                        </div>
                    </Tab>
                </Tabs>
            </div>
        </div>
    )
}

export default AppointmentsPage;