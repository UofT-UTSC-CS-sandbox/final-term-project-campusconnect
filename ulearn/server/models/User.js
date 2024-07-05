const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    clerkId: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
    },
    university: {
        type: String,
    },
    year: {
        type: Number,
    },
    languages: {
        type: [{
            type: String
        }],
    },
    finishedSignUp: {
        type: Boolean
    }
});

const UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;
