
import React, { useEffect, useState } from 'react';
import { UserButton, useUser } from '@clerk/clerk-react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import './homePage.css'; // Import your CSS file
import axios from 'axios';


function HomePage() {

    const navigate = useNavigate();
    const { user } = useUser(); // can be used to fetch user specific data

    const [tutors, setTutors] = useState([]);
    const [userLanguages, setUserLanguages] = useState([]);

    useEffect(() => {
        if (user && user.primaryEmailAddress) {
            console.log("Component mounted, fetching tutors");
            getUserLanguages();
        }
    }, [user]);

    useEffect(() => {
        console.log("User languages updated:", userLanguages);
        // Additional logic dependent on userLanguages
        populateTutors();

    }, [userLanguages]);


    const getUserLanguages = () => {
        const email = user.primaryEmailAddress;
        console.log("Fetching user data for email:", email);
        // Fetch the user's languages
        axios.get('http://localhost:3001/getUserByEmail', { params: { email: email } })
            .then(response => {
                const userData = response.data;
                setUserLanguages(userData.languages);
            })
            .catch(error => {
                console.error("Error fetching user languages:", error);
            });
    };

    // for testing purposes, placeholder for now  
    const populateTutors = () => {

        // fetch all tutors from the database
        axios.get(`http://localhost:3001/gettutors`)
            .then(tutorsResponse => {
                console.log("tutors fetched");
                // store tutors in tutorsData
                const tutorsData = tutorsResponse.data;

                // for each tutor in tutorsData, 
                tutorsData.forEach(tutor => {
                    // fetch the email, verified courses of the tutor
                    const email = tutor.email;
                    const courses = tutor.verifiedCourses;
                    const price = tutor.rate;
                    console.log('Fetching data for email:', email);

                    // in the future, need to fetch rating as well

                    // fetch the user data of the tutor, using email 
                    axios.get('http://localhost:3001/getUserByEmail', { params: { email: email } })
                        .then(userResponse => {
                            if (userResponse.data) {
                                console.log('User data:', userResponse.data);
                                
                                const tutorData = {
                                    name: userResponse.data.name,
                                    email: userResponse.data.email,
                                    image: userResponse.data.image,
                                    courses: courses,
                                    price: price,
                                    rating: 5, // Assuming a default rating of 5 if not provided (placeholder for now)
                                    languages: userResponse.data.languages || [],

                                };
                                // log complete tutor data
                                console.log('Tutor data:', tutorData);

                                // update tutor array with the tutor data
                                // only add tutor if not already in the array
                                setTutors(prevTutors => {
                                    if (!prevTutors.some(t => t.email === tutorData.email) && tutorData.languages.some(lang => userLanguages.includes(lang))) {
                                        return [...prevTutors, tutorData];
                                    } else {
                                        return prevTutors;
                                    }
                                });
                            } else {
                                console.log('User not found for email:', email);
                            }
                        })
                        .catch(userError => {
                            console.error('Error fetching user by email:', email, userError);
                        });
                });
            })
            .catch(tutorsError => {
                console.error('Error fetching tutors:', tutorsError);
            });
    };

    // formating courses for view such that it displays the first two courses, seperated by a comma, and then adds '...' if there are more
    const formatCourses = (courses) => {
        if (!courses) return '';
        if (courses.length <= 2) return courses.join(', ');
        return `${courses.slice(0, 2).join(', ')}, ...`;
    };

    // Function to handle click and redirect to tutor's page
    const handleTutorClick = (tutorName, email) => {
        navigate(`/tutor/${tutorName}`, { state: {email: email}});
    };

    // placeholder for search 
    const handleSearch = () => {
        console.log("Search bar clicked");
    }

    return (

        <div className="homepage">
            <div className="header-userbutton">
                <UserButton />
            </div>
            <div className="header-home">
                <h1> Find Your Tutor!</h1>
            </div>
            <button className="setting-button">Tabs</button>
            <div className="search-bar">
                <input type="text" placeholder="Search" onClick={handleSearch} />
                <button className="filter-button">Filter</button>
            </div>
            <div className="header2-home">
                <h2> Top Tutors</h2>
            </div>
            <div className="tutors-container">
                {tutors.map(tutor => (
                    <div
                        key={tutor.name}
                        className="tutor-card"
                        onClick={() => handleTutorClick(tutor.name, tutor.email)}
                    >
                        <img src={tutor.image} alt={tutor.name} className="tutor-image" />
                        <div className="tutor-info">
                            <p className="tutor-name">{tutor.name}</p>
                            <div className="tutor-rating">
                                {'★'.repeat(tutor.rating)}{'☆'.repeat(5 - tutor.rating)}
                            </div>
                            <p> Price: ${tutor.price}/hr</p>
                            <p>{formatCourses(tutor.courses)}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default HomePage;
