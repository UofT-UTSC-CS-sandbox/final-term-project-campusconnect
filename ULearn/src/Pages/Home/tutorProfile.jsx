import React, { useEffect, useState } from 'react';
import { UserButton, useUser } from '@clerk/clerk-react';
import { Link, useParams } from 'react-router-dom';
import './homePage.css'; // Import your CSS file
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';


function TutorProfile() {
    //getting the tutor email from homepage
    const {state} = useLocation();
    const {email} = state;
    const navigate = useNavigate();

    //retrieve the tutor's ID and send it to the chatroom to start a message channel
    const handleMessageClick = (email) => {
        axios.get('http://localhost:3001/getUserByEmail', { params: { email: email } })
            .then(response => {
                const userData = response.data;
                navigate(`/chatRoom`, {state: {clerkid: userData.clerkId}})
            })
            .catch(error => {
                console.error("Error fetching user languages:", error);
            });
    }

    return (
        <div>
            <h1>

            </h1>
            <button 
                onClick={() => handleMessageClick(email)}>
                Message
            </button>
        </div>
        
    )
}

export default TutorProfile;