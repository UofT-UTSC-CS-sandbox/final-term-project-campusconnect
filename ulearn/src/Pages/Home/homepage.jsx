import React, { useEffect, useState } from 'react';
import { UserButton, useUser } from '@clerk/clerk-react';
import './homePage.css'; // Import your CSS file
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import TutorCard from '../../components/TutorCard/tutorCard';
import { courses } from './constants';
import Navbar from '../../components/Navbar/Navbar.jsx';

function HomePage() {

    const homepageCustomStyles = {
        control: (provided, state) => ({
            ...provided,
            border: '2px solid black',
            borderRadius: '20px',
            padding: '1px',
            margin: '20px 0px',
            boxShadow: state.isFocused ? '0 0 0 1px black' : null,
            '&:hover': {
                borderColor: 'black',
            },
           height: "30px"
           
        }),
        menu: (provided) => ({
            ...provided,
            borderRadius: '8px',
        }),
        option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isSelected ? 'rgb(22, 86, 166)' : 'white',
            '&:hover': {
                backgroundColor: 'rgb(22, 86, 166)',
            },
        }),
    };

    const navigate = useNavigate();
    const { user } = useUser();
    const [tutors, setTutors] = useState([]);
    const [allTutors, setAllTutors] = useState([]);
    const [userLanguages, setUserLanguages] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState(null);

    useEffect(() => {
        if (user && user.primaryEmailAddress) {
            getUserLanguages();
        }
    }, [user]);

    useEffect(() => {
        populateTutors();
    }, [userLanguages]);

    const getUserLanguages = () => {
        const email = user.primaryEmailAddress;
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

    const populateTutors = () => {

        // fetch all tutors from the database
        axios.get(`http://localhost:3001/gettutors`)
            .then(tutorsResponse => {
                // store tutors in tutorsData
                const tutorsData = tutorsResponse.data;

                // for each tutor in tutorsData, 
                tutorsData.forEach(tutor => {
                    // fetch the email, verified courses of the tutor
                    const email = tutor.email;
                    const courses = tutor.verifiedCourses;
                    const price = tutor.rate;

                    // in the future, need to fetch rating as well
                    // fetch the user data of the tutor, using email 
                    axios.get('http://localhost:3001/getUserByEmail', { params: { email: email } })
                        .then(userResponse => {
                            if (userResponse.data) {

                                const tutorData = {
                                    name: userResponse.data.name,
                                    email: userResponse.data.email,
                                    image: userResponse.data.image,
                                    courses: courses,
                                    price: price,
                                    rating: 5, // Assuming a default rating of 5 if not provided (placeholder for now)
                                    languages: userResponse.data.languages || [],

                                };

                                // update tutor array with the tutor data
                                // only add tutor if not already in the array
                                setAllTutors(prevTutors => {
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

    const formatCourses = (courses) => {
        if (!courses) return '';
        if (courses.length <= 2) return courses.join(', ');
        return `${courses.slice(0, 2).join(', ')}, ...`;
    };

    const handleTutorClick = (tutorName, email) => {
        navigate(`/tutor/${tutorName}`, { state: { email: email } });
    };

    const handleCourseSearch = (selectedCourse) => {
        setSelectedCourse(selectedCourse ? selectedCourse.value : null);
        if (selectedCourse && selectedCourse.value === 'All courses') {
            setTutors(allTutors);
        } else if (selectedCourse) {
            const filteredTutors = allTutors.filter(tutor => 
                tutor.courses.includes(selectedCourse.value)
            );
            setTutors(filteredTutors);
        } else {
            setTutors(allTutors);
        }
    };

    return (
        <div className="homepage-wrapper">
            <Navbar/>
            <div className="header-userbutton">
                <UserButton />
            </div>
            <h1 className='homepage-header-main'> Find Your Tutor!</h1>
            <button className="homepage-tabs-button">Tabs</button>
            <div className="homepage-search-bar">
                <Select 
                    placeholder="Search for a course"
                    required={true}
                    options={courses}
                    value={courses.find(course => course.value === selectedCourse)}
                    onChange={handleCourseSearch}
                    styles={homepageCustomStyles}
                />
            </div>
            <button className="homepage-filter-button">Filter</button>
            <div className="homepage-tutors-container">
                {tutors.map(tutor => (
                    <TutorCard
                        key={tutor.email}
                        email={tutor.email}
                        tutor={tutor}
                        handleTutorClick={handleTutorClick}
                        formatCourses={formatCourses}
                    />
                ))}
            </div>
        </div>
    );
}

export default HomePage;
