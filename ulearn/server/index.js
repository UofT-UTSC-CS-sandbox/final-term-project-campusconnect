const express = require('express');
const { withAuth } = require('@clerk/clerk-sdk-node');
const mongoose = require('mongoose');

const User = require('./models/User'); // Path to your User model

const app = express();

// Connect to MongoDB
mongoose.connect("mongodb+srv://ulearncc:aammmulearn@ulearn.jjcv6kg.mongodb.net/users?retryWrites=true&w=majority&appName=ULearn").then(() => {
    console.log("Connected to DB");
}).catch((err) => console.log(err));

// Middleware to parse JSON
app.use(express.json());

// Clerk Authentication Middleware
const clerkFrontendApi = 'YOUR_CLERK_FRONTEND_API'; // Use your Clerk Frontend API
app.use(withAuth({ frontendApi: clerkFrontendApi }));

// Example route to get user info and save to MongoDB
app.post('/save-user', async (req, res) => {
    const { userId, email, firstName, lastName } = req.auth;

    try {
        const user = new User({
            clerkId: userId,
            email: email,
            name: `${firstName} ${lastName}`,
            // Add any other fields
        });

        await user.save();
        res.status(201).json(user);
    } catch (err) {
        res.status(500).json({ error: 'Failed to save user' });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
