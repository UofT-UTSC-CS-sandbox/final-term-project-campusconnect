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
    profileImageUrl: {
        type: String,
        //required: true, //unsure
    }

    // Add any other fields you need
});

const UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;
