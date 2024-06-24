
import React, { useEffect, useState } from 'react';
import { UserButton, useUser } from '@clerk/clerk-react';
import { Link, parsePath } from 'react-router-dom';
import './homePage.css'; // Import your CSS file
//import { tutors } from './TutorProfiles.jsx';
import axios from 'axios';


function HomePage() {
    const { user } = useUser();

    const [tutors, setTutors] = useState([]);

    useEffect(() => {
        console.log("Component mounted, fetching tutors");
        populateTutors();
    }, []);
      
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
                console.log('Fetching data for email:', email);

                // in the future, need to fetch rating as well

                // fetch the user data of the tutor, using email 
                axios.get('http://localhost:3001/getUserByEmail', { params: { email: email }})
                    .then(userResponse => {
                        if (userResponse.data) {
                            console.log('User data:', userResponse.data);
                            const tutorData = {
                                name: userResponse.data.name,
                                email: userResponse.data.email,
                                image: `http://localhost:3001/${userResponse.data.image}`,
                                courses: courses,
                                rating: 5, // Assuming a default rating of 5 if not provided (placeholder for now)
                                
                            };
                            
                            console.log('image link: ', tutorData.image);
                            

                            // test 
                            // Log the tutor data to verify the image link
                            console.log('Tutor data:', tutorData);

                            // update tutor array with the tutor data
                            // only add tutor if not already in the array
                            setTutors(prevTutors => {
                                if (!prevTutors.some(t => t.email === tutorData.email)) {
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
        <input type="text" placeholder="Search" onClick={handleSearch}/>
        <button className="filter-button">Filter</button>
      </div>
      <div className="header2-home">
        <h2> Top Tutors</h2>      
      </div>
      <div className="tutors-container">
        {tutors.map(tutor => (
          <Link to={`/tutor/${tutor.name}`} key={tutor.name} className="tutor-card">
             <img src={tutor.image} alt={tutor.name} className="tutor-image" />
            <div className="tutor-info">
                <p className="tutor-name">{tutor.name}</p>
                <div className="tutor-rating">
                    {'★'.repeat(tutor.rating)}{'☆'.repeat(5 - tutor.rating)}
                </div>
              <p>Courses: {tutor.courses}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default HomePage;
