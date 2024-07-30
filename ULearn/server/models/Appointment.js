const mongoose = require('mongoose');

const AppointmentSchema = new mongoose.Schema({
    userClerkId: {
       type: String,
       required: true,
       unique: true,
    },
    userName: {
        type: String,
        required: true,
        unique: true,
     },
    appointments: [
        {
            otherName: {
                type: String,
                required: true,
            },
            otherClerkId: {
                type: String,
                required: true,
            },
            topic: {
                type: String,
                required: true,
            },
            description: {
                type: String,
            },
            status: {
                type: String,
                default: "Waiting",
                required: true,
            },
            startTime: {
                type: Date,
                required: true,
            },
            endTime: {
                type: Date,
                required: true,
            }
        }
    ]
}, { timestamps: true });

const AppointmentModel = mongoose.model('Appointment', AppointmentSchema);

module.exports = AppointmentModel;
