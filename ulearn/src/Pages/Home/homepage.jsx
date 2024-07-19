import React, { useEffect, useState } from 'react';
import { useUser } from '@clerk/clerk-react';
import './homePage.css';
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
    const [isFilterSidebarOpen, setIsFilterSidebarOpen] = useState(false);
    const [priceFilter, setPriceFilter] = useState(40);
    const [ratingFilter, setRatingFilter] = useState([0,5]);

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
    }, [searchTerm, allTutors, priceFilter, ratingFilter]);

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
    const filterTutors = async () => {
        let filteredTutors = allTutors;

        if (searchTerm !== '') {
            filteredTutors = filteredTutors.filter(tutor =>
                tutor.courses.some(course => course.toUpperCase().includes(searchTerm.toUpperCase()))
            );
        }

        filteredTutors = filteredTutors.filter(tutor =>
            tutor.price <= priceFilter // Only upper bound is checked for price
        );

        // Fetch reviews and filter tutors based on rating
        const tutorPromises = filteredTutors.map(async tutor => {
            const reviewsResponse = await axios.get(`http://localhost:3001/reviews/${tutor.email}`);
            const reviewsData = reviewsResponse.data[0];
            let rating = 0;
            let totalReviews = 0;

            if (reviewsData) {
                const starCountArray = reviewsData.starCountArray;
                const totalStars = starCountArray.reduce((sum, count, index) => sum + (count * (index + 1)), 0);
                totalReviews = starCountArray.reduce((sum, count) => sum + count, 0);
                rating = totalReviews > 0 ? Math.floor((totalStars / totalReviews)) : 0;
            }

            if (rating >= ratingFilter[0] && rating <= ratingFilter[1]) {
                return tutor;
            }
            return null;
        });

        const filteredTutorsWithRating = (await Promise.all(tutorPromises)).filter(tutor => tutor !== null);

        setTutors(filteredTutorsWithRating);
    };

    const toggleFilterSidebar = () => {
        setIsFilterSidebarOpen(!isFilterSidebarOpen);
    };

    return (
        <>
            <Nav/>
            <div className="homepage-wrapper">
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
                <FilterSideBar 
                    isOpen={isFilterSidebarOpen}
                    onClose={toggleFilterSidebar}
                    priceFilter={priceFilter} 
                    ratingFilter={ratingFilter}
                    setPriceFilter={setPriceFilter}
                    setRatingFilter={setRatingFilter}
                />
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
        </>
    );
}

export default HomePage;
