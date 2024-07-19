import React, { useEffect, useState } from 'react';
import { useUser } from '@clerk/clerk-react';
import './homePage.css'; // Import your CSS file
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import TutorCard from '../../components/TutorCard/tutorCard';
import { IoFilter } from "react-icons/io5";
import Nav from '../../components/Nav/Nav.jsx'
import FilterSideBar from '../../components/FilterSideBar/FilterSideBar.jsx'

function HomePage() {
    const navigate = useNavigate();
    const { user } = useUser();
    const [tutors, setTutors] = useState([]);
    const [allTutors, setAllTutors] = useState([]);
    const [userLanguages, setUserLanguages] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [isFilterSidebarOpen, setIsFilterSidebarOpen] = useState(false); // State to manage FilterSidebar visibility

    useEffect(() => {
        if (user && user.primaryEmailAddress) {
            getUserLanguages();
        }
    }, [user]);

    useEffect(() => {
        populateTutors();
    }, [userLanguages]);

    useEffect(() => {
        filterTutors();
    }, [searchTerm, allTutors]);

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

    const handleCourseSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    //populate tutors based on the course in the search bar
    const filterTutors = () => {
        if (searchTerm === '') {
            setTutors(allTutors);
        } else {
            const filteredTutors = allTutors.filter(tutor => 
                tutor.courses.some(course => course.toUpperCase().includes(searchTerm.toUpperCase()))
            );
            setTutors(filteredTutors);
        }
    };

    const toggleFilterSidebar = () => {
        setIsFilterSidebarOpen(!isFilterSidebarOpen); // Toggle the sidebar visibility
    };

    return (
        <div className="homepage-wrapper">
            <Nav/>
            <h1 className='homepage-header-main'> Find Your Tutor!</h1>
            <div className="homepage-search-bar">
                <input 
                    type="text" 
                    placeholder="Search for a course" 
                    value={searchTerm}
                    onChange={handleCourseSearch}
                    className="course-search-input"
                />
                <IoFilter className="filter-icon" onClick={toggleFilterSidebar}/>
            </div>
            <FilterSideBar isOpen={isFilterSidebarOpen} onClose={toggleFilterSidebar} />
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
