import React, { useState } from 'react';
import './Feedback.css'; // Assuming you have a CSS file for styling
import axios from 'axios';
import { useUser } from '@clerk/clerk-react';


function Feedback() {
    const [rating, setRating] = useState(0);
    const [feedback, setFeedback] = useState('');
    const { user } = useUser();

    const handleRating = (rate) => {
        setRating(rate);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const reviewData = {
            tutorEmail: 'arina.azmi@mail.utoronto.ca', // Replace with the actual tutor email
            studentEmail: 'arina.azmi@mail.utoronto.ca',
            //user.primaryEmailAddress, // Replace with the actual student email
            rate: rating,
            description: feedback
        };

        try {
            console.log(reviewData);
            const response = await axios.post('http://localhost:3001/reviews', reviewData);
            //console.log(tutorEmail, studentEmail, rate, description);
            console.log('Review submitted:', response.data);
        } catch (error) {
            console.error('Error submitting review:', error);
        }
    };

    return (
        <div className="feedback-wrapper">
            <h1 className="feedback-header">Add your feedback</h1>
            <form onSubmit={handleSubmit} className="feedback-form">
                <div className="star-rating">
                    {[...Array(5)].map((star, index) => {
                        index += 1;
                        return (
                            <button
                                type="button"
                                key={index}
                                className={index <= rating ? "on" : "off"}
                                onClick={() => handleRating(index)}
                            >
                                <span className="star">&#9733;</span>
                            </button>
                        );
                    })}
                </div>
                <textarea
                    className="feedback-textarea"
                    placeholder="Feedback..."
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                />
                <button type="submit" className="submit-button">Submit</button>
            </form>
        </div>
    );
}

export default Feedback;
