import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ReviewPosts.css';

const ReviewPosts = ({ email }) => {
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/reviews/${email}`);
                const reviewsData = response.data[0]?.reviews || [];
                const sortedReviews = reviewsData.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                setReviews(sortedReviews);
            } catch (error) {
                console.error('Error fetching reviews:', error);
            }
        };

        fetchReviews();
    }, [email]);

    return (
        <div className="reviews-container">
            {reviews.length > 0 ? (
                reviews.map(review => (
                    <div key={review._id} className="review-post">
                        <div className="review-header">
                            <img src={review.user.image || 'default_user_image_url'} alt={review.user.name} className="review-user-image aspect-circle object-cover" />
                            <div className="review-user-info">
                                <span className="review-user-name">{review.user.name}</span>
                                <span className="review-date">{new Date(review.createdAt).toLocaleDateString()}</span>
                            </div>
                        </div>
                        <div className="review-rating">
                            {'★'.repeat(review.rate)}{'☆'.repeat(5 - review.rate)}
                        </div>
                        <div className="review-text">{review.description}</div>
                    </div>
                ))
            ) : (
                <p>No reviews yet.</p>
            )}
        </div>
    );
};

export default ReviewPosts;
