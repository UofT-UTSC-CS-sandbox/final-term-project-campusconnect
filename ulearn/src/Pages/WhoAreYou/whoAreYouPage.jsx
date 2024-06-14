import React, { useState } from 'react';
import { UserButton } from '@clerk/clerk-react';
import './whoAreYouPage.css'; // Create this file for styling
import student from '../../assets/images/whoAreYouPageImgs/student.png'
import tutor from '../../assets/images/whoAreYouPageImgs/tutor.png'

const WhoAreYouPage = () => {
    const [selectedRole, setSelectedRole] = useState(null);

    const handleSelection = (role) => {
        setSelectedRole(role);
    };

    const handleNext = (event) => {
        event.preventDefault();
        if (selectedRole === 'tutor') {
            window.location.href = "/tutorInfo"
        }
        else {
            window.location.href = "/homePage"
        }
    }
    return (
        <form onSubmit={handleNext}>
        <div className="selection-container">
            <h2>Who are you?</h2>
            <UserButton />
            <div className="image-buttons">
                <div
                    className={`image-button ${selectedRole === 'student' ? 'selected' : ''}`}
                    onClick={() => handleSelection('student')}
                >
                    <img src={student} alt="Student"/>
                    <p>Student</p>
                </div>
                <div
                    className={`image-button ${selectedRole === 'tutor' ? 'selected' : ''}`}
                    onClick={() => handleSelection('tutor')}
                >
                    <img src={tutor} alt="Tutor" />
                    <p>Tutor</p>
                </div>
            </div>
            {/* <button disabled={!selectedRole}>
                Next
            </button> */}
            <input type='submit' value='Next' disabled={!selectedRole}></input>
        </div>
        </form>
    );
};

export default WhoAreYouPage;