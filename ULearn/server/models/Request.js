const mongoose = require('mongoose');

const RequestSchema = new mongoose.Schema({
    tutorEmail: {
       type: String,
       required: true,
       unique: true,
    },
    requests: [
        {
            studentEmail: {
                type: String,
                required: true,
            },
            startTime: {
                type: String,
                required: true,
            },
            endTime: {
                type: String,
                required: true,
            },
            status: {
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
            
        }
    ]
}, { timestamps: true });

const RequestModel = mongoose.model('Request', RequestSchema);

module.exports = RequestModel;
