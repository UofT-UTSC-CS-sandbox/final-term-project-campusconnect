const mongoose = require('mongoose');
const express = require('express');
const { withAuth } = require('@clerk/clerk-sdk-node');

const User = require('./models/User'); // Path to your User model

const app = express();

// Connect to MongoDB
mongoose.connect("mongodb+srv://michaelrwwalker:Simba_Dog1@user.ka0o0se.mongodb.net/?retryWrites=true&w=majority&appName=user/user")

mongoose.connection.on('connected', () => {
    console.log('Mongoose connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
    console.log('Mongoose connection error: ' + err);
});

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
