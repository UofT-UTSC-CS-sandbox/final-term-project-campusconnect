import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';
import Nav from '../../components/Nav/Nav';
import { Tab, Tabs } from '../../components/tabs';

const AppointmentsPage = () => {
    //getting the tutor email from homepage
    const {state} = useLocation();
    const {email} = state;
    
    const {user, isLoaded} = useUser(null);
    useEffect(() => {
        if (!isLoaded) {
            console.log("User not loaded");
            return;
        }
        if (!user) {
            console.log("User not found");
            return;
        }
        loadUserInfo();
    }, [user, isLoaded, email]); // Added email dependency

    async function loadUserInfo() { //gets user information and appointment information from database
        try {
            const userResponse = await axios.get('http://localhost:3001/getUserByEmail', { params: { email } });
            const appointmentsResponse = await axios.get('')

            if (userResponse.data) {
                loadAppointments(appointmentsResponse);
            } else {
                console.log('User not found for email:', email);
            }
        } catch (error) {
            console.error("Error fetching tutor info:", error);
        }
    }

    return (
        <div className='bg-white w-full h-fit min-h-full min-w-screen '> 
            <div className='border-gray-300 border-b-2 bg-white w-screen shadow-lg min-w-full sticky top-0'>
                <Nav></Nav>
            </div>
            <div className='flex justify-center items-center'>
                <Tabs>
                    <Tab label="Appointments">
                        <div className='overflow-y-scroll max-h-screen'>
                            Placeholder content for Booked Appointments
                        </div>
                    </Tab>
                    <Tab label="Pending">
                        <div className='overflow-y-scroll max-h-screen'>
                            Placeholder content for Pending Appointment Requests
                        </div>
                    </Tab>
                </Tabs>
            </div>
        </div>
    )
}

export default AppointmentsPage;