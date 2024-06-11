const { requireAuth } = require('@clerk/clerk-sdk-node');

const saveUserHandler = async (req, res) => {
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
};

app.post('/save-user', requireAuth(saveUserHandler));
