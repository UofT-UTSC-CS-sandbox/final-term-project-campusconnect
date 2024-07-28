import React, { useEffect, useState } from 'react';
import './homePage.css'; // Import your CSS file
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';
import Nav from '../../components/Nav/Nav';
import { Tab, Tabs } from '../../components/tabs';
import { BarChart } from '../../components/BarChart/barChart';
import ReviewPosts from './reviewPosts';
import RequestTutorButton from '../../components/RequestTutorButton';

const TutorProfile = () => {
    //getting the tutor email from homepage
    const {state} = useLocation();
    const {email} = state;

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

    async function loadTutorInfo() { //gets tutor information from database
        try {
            const tutorResponse = await axios.get('http://localhost:3001/getTutorByEmail', { params: { email } });
            const userResponse = await axios.get('http://localhost:3001/getUserByEmail', { params: { email } });
            const reviewsResponse = await axios.get(`http://localhost:3001/reviews/${email}`); // Fetch reviews
            var rating; // Calculate average rating from reviews
            var totalReviews = 0;

            if (reviewsResponse.data[0]) {
                const starCountArray = reviewsResponse.data[0].starCountArray;
                const totalStars = starCountArray.reduce((sum, count, index) => sum + (count * (index + 1)), 0);
                totalReviews = starCountArray.reduce((sum, count) => sum + count, 0);
                rating = totalReviews > 0 ? Math.floor((totalStars / totalReviews)) : 0;
            }

            if (userResponse.data && tutorResponse.data) {
                const fullTutorData = {
                    name: userResponse.data.name,
                    email: userResponse.data.email,
                    image: userResponse.data.image,
                    courses: tutorResponse.data.verifiedCourses,
                    price: tutorResponse.data.rate,
                    description: tutorResponse.data.description,
                    rating: rating || 0,
                    languages: userResponse.data.languages || [],
                    starCountArray: reviewsResponse.data[0] ? reviewsResponse.data[0].starCountArray : [],
                    totalReviews: totalReviews, // Add total reviews
                };
                setTutor(fullTutorData);
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
                navigate(`/chatRoom`, { state: { clerkid: userData.clerkId, tutorname: userData.name, tutorimage: userData.image } })
            })
            .catch(error => {
                console.error("Error fetching user:", error);
            });
    }

    const displayCourses = (courses) => {
        if (!courses) return '';
        let newcourses = [' • ']
        newcourses = newcourses+courses.slice().join(' • ');
        return newcourses;
    };

    const displayLanguages = (lang) => {
        if (!lang) return '';
        let newlang = [' • ']
        newlang = newlang+lang.slice().join(' • ');
        return newlang;
    };

    return (
        <div className='bg-white w-full h-fit min-h-full min-w-screen '> 
            <div className='border-gray-300 border-b-2 bg-white w-screen shadow-lg min-w-full sticky top-0'>
                <Nav></Nav>
            </div>
            <div className='flex justify-center items-center'>
                <div className='w-5/6 h-screen grid grid-cols-4 gap-4 mt-10 grid-rows-2'>
                    <div className='col-start-1 row-span-3 bg-white grid grid-rows-2 border-r-2 border-gray-200 shadow-2xl'>
                        <div className='row-start-1 row-span-1 size-11/12 justify-self-center mt-3 border-b-2 border-gray-300 space-y-2'>
                            <img src={tutor && tutor.image} className='rounded-3xl aspect-square object-cover'>
                            </img>
                        </div>
                        <div className='grid row-start-2 justify-items-center'>
                            <div className='border-b-2 border-gray-300 w-11/12'>
                                <header className=''>
                                    Courses
                                </header>
                                <p className='text-gray-400'>
                                    {tutor && displayCourses(tutor.courses)}
                                </p>
                            </div>
                            <div className=' border-gray-300 w-11/12'>
                                <header>
                                    Languages
                                </header>
                                <p className='text-gray-400'>
                                    {tutor && displayLanguages(tutor.languages)}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className=' col-start-2 col-span-2 row-start-1 mt-3' id='tutormidsection'>
                        <header className='text-5xl w-full' >
                            {tutor && tutor.name + '     '}
                            <span className='size-fit text-amber-400 text-4xl mb-4 align-middle space-x-4'>
                                <span>
                                    {tutor && '★'.repeat(tutor.rating)}{tutor && '☆'.repeat(5 - tutor.rating)}
                                </span>
                                <span className='text-sm text-gray-500 align-middle'>
                                    {tutor && tutor.starCountArray && tutor.starCountArray.length > 0 ? (
                                        `(${tutor.totalReviews})` /* note: add the total number of ratings*/
                                    ) : (
                                        '(0)'
                                    )}

                                </span>
                            </span>
                        </header>
                        <div className='mt-5'>
                            {tutor && tutor.starCountArray && tutor.starCountArray.length > 0 ? (
                                <BarChart
                                    chartH='250px'
                                    chartW= {document.getElementById('tutormidsection').offsetWidth || '800'}
                                    barSpace='50'
                                    barColour='#fbbf24'
                                    barThick='15'
                                    data={[
                                        { name: '5 star', value: tutor.starCountArray[4] || 0 },
                                        { name: '4 star', value: tutor.starCountArray[3] || 0 },
                                        { name: '3 star', value: tutor.starCountArray[2] || 0 },
                                        { name: '2 star', value: tutor.starCountArray[1] || 0 },
                                        { name: '1 star', value: tutor.starCountArray[0] || 0 },
                                    ]}
                                />
                            ) : (
                                <p>No reviews</p>
                            )}
                        </div>
                    </div>
                    <div className='col-start-2 col-span-3 row-start-2 bg-white shadow-2xl border-t-2 border-gray-100 h-fit min-h-full max-h-100 w-full'>
                        <Tabs>
                            <Tab label="About">
                                <div className="py-4">
                                    <p className="text-gray-700">
                                        {tutor && tutor.description}
                                    </p>
                                </div>
                            </Tab>
                            <Tab label="Schedule">
                                <div className="py-4">
                                    <p className="text-gray-700">
                                        Placeholder content for schedule
                                        <RequestTutorButton />
                                    </p>
                                </div>
                            </Tab>
                            <Tab label="Reviews">
                                <div className='overflow-y-scroll max-h-screen'>
                                    <ReviewPosts style='scroll-behaviour:smooth' email={email} />
                                </div>
                            </Tab>
                        </Tabs>
                    </div>
                    <div className='flex col-start-4 justify-end mt-5 gap-4'>
                        <div className='mt-2'>
                            Rate: ${tutor && tutor.price}/hr
                        </div>
                        <button className='bg-blue-500 h-10 w-40 rounded-lg text-white '
                            onClick={() => handleMessageClick(email)}>
                            Message
                        </button>
                    </div>
                </div>
            </div>
        </div>
        

    )
}

export default TutorProfile;