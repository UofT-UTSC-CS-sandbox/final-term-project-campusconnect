const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
    tutorEmail: {
       type: String,
       required: true,
       unique: true,
    },
    starCountArray: {
        type: [Number],
        required: true,
    },
    // Star1Count: {
    //     type: Number,
    // },
    // Star2Count: {
    //     type: Number,
    // },
    // Star3Count: {
    //     type: Number,
    // },
    // Star4Count: {
    //     type: Number,
    // },
    // Star5Count: {
    //     type: Number,
    // },
    reviews: [
        {
            studentEmail: {
                type: String,
                required: true,
            },
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
                required: true,
            },
            rate: {
                type: Number,
            },
            description: {
                type: String,
            }
        }
    ]
});

const ReviewModel = mongoose.model('Review', ReviewSchema);

module.exports = ReviewModel;
