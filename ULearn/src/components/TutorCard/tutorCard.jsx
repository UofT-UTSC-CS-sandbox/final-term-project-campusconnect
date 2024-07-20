import React from 'react';
import './tutorCard.css';

const TutorCard = ({ email, tutor, handleTutorClick, formatCourses }) => {
    return (
        <div
            key={tutor.name}
            className="tutor-card"
            onClick={() => handleTutorClick(tutor.name, email)}
        >
            <img src={tutor.image} alt={tutor.name} className="tutor-card-tutor-image" />
            <div className="tutor-card-tutor-info">
                <p className="tutor-card-tutor-name">{tutor.name}</p>
                <div className="tutor-card-tutor-rating">
                    {tutor.rating === 0 
                        ? <span className="no-reviews">No reviews</span> 
                        : '★'.repeat(Math.round(tutor.rating)) + '☆'.repeat(5 - Math.round(tutor.rating))
                    }
                </div>
                <p>Price: ${tutor.price}/hr</p>
                <p>{formatCourses(tutor.courses)}</p>
            </div>
        </div>
    );
};

export default TutorCard;
