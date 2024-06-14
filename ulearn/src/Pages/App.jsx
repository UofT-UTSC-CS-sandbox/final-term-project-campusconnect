import { useEffect } from 'react';
import './App.css';
import slogan from '../assets/images/slogan.png';
import tutoringImage from '../assets/images/img2.png';
import PersonalInfoPage from './PersonalInfo/PersonalInfoPage';
import { SignedIn, SignedOut, SignInButton, useUser } from "@clerk/clerk-react";
import axios from 'axios';

function App() {
  const { isSignedIn, user } = useUser();

  useEffect(() => {
    if (isSignedIn && user) {
      const clerkId = user.id;
      const email = String(user.primaryEmailAddress);
      const name = user.fullName;
      axios.post(`http://localhost:3001/login`, { email })
        .then(response => {
          if (response.data === "not found") {
            console.log(clerkId);
            axios.post(`http://localhost:3001/register`, { clerkId, email, name })
              .then(response => {
                console.log(response.data);
              });
          }
        });
    }
  }, [isSignedIn, user]);

  return (
    <div className="app-container">
      <SignedOut>
        <h2>ULearn!</h2>
        <div className="home-container">
          <h1>Online tutoring that releases potential</h1>
          <p>Are University Courses Overwhelming You? Discover Tailored Tutoring Solutions to Help You Excel and Achieve Your Goals!</p>
          <div className="search-container">
            <SignInButton />
          </div>
          <img src={tutoringImage} alt="Tutoring" className="tutoring-image" />
        </div>
      </SignedOut>
      <SignedIn>
        <PersonalInfoPage />
      </SignedIn>
    </div>
  );
}

export default App;
