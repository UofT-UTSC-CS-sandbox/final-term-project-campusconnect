import React, { useEffect, useState } from 'react';
import './homePage.css'; // Import your CSS file
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';

const TutorProfile = () => {
    //getting the tutor email from homepage
    const {state} = useLocation();
    const {email} = state;
    //tutor.email = email;
    const [tutor, setTutor] = useState();
    
    const navigate = useNavigate();

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
        loadTutorInfo();
    }, [user, isLoaded, email]); // Added email dependency

    async function loadTutorInfo() {
        try {
            const tutorResponse = await axios.get('http://localhost:3001/getTutorByEmail', { params: { email } });
            console.log(tutorResponse.data)
            const userResponse = await axios.get('http://localhost:3001/getUserByEmail', { params: { email } });
            if (userResponse.data && tutorResponse.data) {
                const fullTutorData = {
                    name: userResponse.data.name,
                    email: userResponse.data.email,
                    image: userResponse.data.image,
                    courses: tutorResponse.data.verifiedCourses,
                    price: tutorResponse.data.rate,
                    description: tutorResponse.data.description,
                    rating: 5,
                    languages: userResponse.data.languages || []
                };
                setTutor(fullTutorData);
                console.log(fullTutorData)
            } else {
                console.log('User not found for email:', email);
            }
        } catch (error) {
            console.error("Error fetching tutor info:", error);
        }
    }

    //retrieve the tutor's ID and send it to the chatroom to start a message channel
    const handleMessageClick = (email) => {
        axios.get('http://localhost:3001/getUserByEmail', { params: { email: email } })
            .then(response => {
                const userData = response.data;
                navigate(`/chatRoom`, {state: {clerkid: userData.clerkId, tutorname: userData.name, tutorimage: userData.image}})
            })
            .catch(error => {
                console.error("Error fetching user:", error);
            });
    }

    return (
        <div className='bg-slate-400 h-full w-full'> 
            <div className='bg-white'>
                <div>
                    <header>
                        {tutor && tutor.name}
                    </header>
                    <header>
                        {tutor && tutor.description}
                    </header>
                </div>
                
                <button 
                    onClick={() => handleMessageClick(email)}>
                    Message
                </button>
            </div>
            
        </div>
        
    )
}

export default TutorProfile;