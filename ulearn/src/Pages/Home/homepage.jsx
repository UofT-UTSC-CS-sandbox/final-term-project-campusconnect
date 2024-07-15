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
        axios.get('http://localhost:3001/aggregatedTutors')
            .then(response => {
                const tutorsData = response.data;
                const filteredTutors = tutorsData.filter(tutor => tutor.languages.some(lang => userLanguages.includes(lang)));
                setAllTutors(filteredTutors);
                setTutors(filteredTutors);
            })
            .catch(error => {
                console.error('Error fetching aggregated tutors:', error);
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
