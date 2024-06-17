const mongoose = require('mongoose');

const TutorSchema = new mongoose.Schema({
    email: {
       type: String,
       required: true,
       unique: true,
    },
    verifiedCourses: {
        type: [{
            type: String
        }],
        required: true,
    },
    rate: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true,
    }

    // Add any other fields you need
});

const TutorModel = mongoose.model('Tutor', TutorSchema);

module.exports = TutorModel;
