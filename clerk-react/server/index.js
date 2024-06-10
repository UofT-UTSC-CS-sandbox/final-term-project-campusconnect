const express = require('express');
const mongoose = require('mongoose');
const UserModel = require('./models/User');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors())

// Connect to MongoDB
mongoose.connect("mongodb+srv://ulearncc:aammmulearn@ulearn.jjcv6kg.mongodb.net/users?retryWrites=true&w=majority&appName=ULearn").then(() => {
    console.log("Connected to DB");
}).catch((err) => console.log(err));

app.post(('/login'), (req, res) => {
    const {clerkID} = req.body;
    UserModel.findOne({clerkID: clerkID})
    .then(user => {
        if(user) {
            res.json("found");
        }
        else {
            res.json("not found");
        }
    })
});

// Example route to get user info and save to MongoDB
app.post('/register', (req, res) => {
    UserModel.create(req.body)
    .then(users => res.json(users))
    .catch(err => res.json(err))
})

app.listen("3001", () => {
    console.log(`Server started on port 3001`);
});
