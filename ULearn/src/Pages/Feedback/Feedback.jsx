import React, { useState } from 'react';
import './Feedback.css'; // Assuming you have a CSS file for styling
import axios from 'axios';
import { useUser } from '@clerk/clerk-react';
import { useLocation, useNavigate } from 'react-router-dom'; // Import useLocation and useNavigate hooks

function Feedback() {
    const [rating, setRating] = useState(0);
    const [feedback, setFeedback] = useState('');
    const { user } = useUser();
    const location = useLocation(); // Use useLocation hook
    const navigate = useNavigate(); // Use useNavigate hook
    const tutorEmail = location.state?.tutorEmail; // Retrieve tutorEmail from state

    console.log("Received tutorEmail in Feedback:", tutorEmail);

    const handleRating = (rate) => {
        setRating(rate);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (rating === 0 && feedback !== '') {
            alert('Rating is required to write a description.');
            return;
        } else if (rating === 0) {
            navigate('/homePage'); // Navigate back to homepage if no rating is placed
            return;
        }

        const reviewData = {
            tutorEmail: tutorEmail, // tutor email 
            studentEmail: String(user.primaryEmailAddress.emailAddress), // student/user email
            rate: rating,
            description: feedback
        };

        try {
            console.log(reviewData);
            const response = await axios.post('http://localhost:3001/reviews', reviewData);
            console.log('Review submitted:', response.data);
            navigate('/homePage'); // Navigate back to homepage after submission
        } catch (error) {
            console.error('Error submitting review:', error);
        }
    };

    const handleClose = () => {
        navigate('/homePage'); // Navigate back to homepage
    };

    // Placeholder for now
    const handleRemindMeLater = async () => {
        // Fetch the channel where you want to send the reminder
        // You should implement how to get the `channel` variable, which represents the chat channel
        // Here we assume `channel` is already defined and represents the correct chat channel
        const message = await channel.sendMessage({
            text: `write Feedback, [click here to join](http://localhost:5173/Feedback/?tutorEmail=${encodeURIComponent(tutorEmail)})`,
        });
        navigate('/homePage'); // Navigate back to homepage
    };

    return (
        <div className="feedback-wrapper">
            <button className="feedback-close-button" onClick={handleClose}>X</button> {/* Add X button */}
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
                <div className="feedback-buttons">
                    <button type="submit" className="feedback-submit-button">Submit</button>
                    <button type="button" className="feedback-remind-button" onClick={handleRemindMeLater}>Remind Me Later</button>
                </div>
            </form>
        </div>
    );
}

export default Feedback;
