const mongoose = require('mongoose');

const AvailabilitySchema = new mongoose.Schema({
    tutorEmail: {
       type: String,
       required: true,
       unique: true,
    },
    
    availableTimes: [
        {
            eventID: {
                type: String,
                required: true,
            },
            startTime: {
                type: Date,
                required: true,
            },
            endTime: {
                type: Date,
                required: true,
            },
        }
    ]
});

const AvailabilityModel = mongoose.model('Availability', AvailabilitySchema);

module.exports = AvailabilityModel;
