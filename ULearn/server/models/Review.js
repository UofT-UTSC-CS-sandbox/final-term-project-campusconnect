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
                required: true,
            },
            description: {
                type: String,
            },
            createdAt: {
                type: Date,
                default: Date.now,
                required: true,
            }
        }
    ]
}, { timestamps: true });

const ReviewModel = mongoose.model('Review', ReviewSchema);

module.exports = ReviewModel;
