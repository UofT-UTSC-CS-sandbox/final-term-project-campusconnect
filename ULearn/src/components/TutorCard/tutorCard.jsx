import React from 'react';
import './tutorCard.css';

const TutorCard = ({ tutor, handleTutorClick, formatCourses }) => {
    return (
        <div
            key={tutor.name}
            className="tutor-card"
            onClick={() => handleTutorClick(tutor.name)}
        >
            <img src={tutor.image} alt={tutor.name} className="tutor-card-tutor-image" />
            <div className="tutor-card-tutor-info">
                <p className="tutor-card-tutor-name">{tutor.name}</p>
                <div className="tutor-card-tutor-rating">
                    {'★'.repeat(tutor.rating)}{'☆'.repeat(5 - tutor.rating)}
                </div>
                <p> Price: ${tutor.price}/hr</p>
                <p>{formatCourses(tutor.courses)}</p>
            </div>
        </div>
    );
};

export default TutorCard;
