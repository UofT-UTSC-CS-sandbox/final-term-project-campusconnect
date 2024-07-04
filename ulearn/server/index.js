const express = require('express');
const mongoose = require('mongoose');
const UserModel = require('./models/User');
const path = require('path'); // Import the path module
const cors = require('cors');
const TutorModel = require('./models/Tutor');
const { StreamClient } = require("@stream-io/node-sdk");
require('dotenv').config({path: '../.env.local'}); 

const app = express();
app.use(express.json());
app.use(cors())

// Connect to MongoDB
mongoose.connect("mongodb+srv://ulearncc:aammmulearn@ulearn.jjcv6kg.mongodb.net/users?retryWrites=true&w=majority&appName=ULearn", {useNewUrlParser: true,
    useUnifiedTopology: true,}).then(() => {
    console.log("Connected to DB");
}).catch((err) => console.log(err));

app.post(('/login'), (req, res) => {
    const {email} = req.body;
    UserModel.findOne({email: email})
    .then(user => {
        if(user) {
            res.json("found");
        }
        else {
            res.json("not found");
        }
    })
});

// update user info
app.post(('/updatePersonalInfo'), (req, res) => {
    const { clerkId, email, name, university, year, languages, image } = req.body;

    UserModel.findOneAndUpdate(
      { email: email },
      { clerkId, name, university, year, languages, image},
      { new: true, upsert: true } // upsert: true will create a new document if no document matches the query
    )
      .then(user => res.json(user), console.log("User found successfully"))
      .catch(err => {
        console.error("Error during registration:", err);
        res.status(500).json({ error: "Internal server error" });
      });
});

app.post('/tutors', (req, res) => {
    TutorModel.create(req.body)
    .then(tutors => res.json(tutors))
    .catch(err => res.json(err))
  });

// Example route to get user info and save to MongoDB
app.post('/register', (req, res) => {
    UserModel.create(req.body)
    .then(users => res.json(users))
    .catch(err => res.json(err))
    
})

// fetches all tutors from tutor collection
app.get('/gettutors', async (req, res) => {
  try {
    const tutors = await TutorModel.find();
    res.json(tutors);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching tutors' });
  }
});

// fetches users by email specified in query
app.get('/getUserByEmail', async (req, res) => {
  const { email } = req.query; // Use req.query to extract email from query parameters
  try {
    const user = await UserModel.findOne({ email: email });
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user or not found' });
  }
});


const STREAM_VIDEO_API_KEY = process.env.VITE_STREAM_VIDEO_API_KEY;
const STREAM_VIDEO_SECRET_KEY = process.env.STREAM_VIDEO_SECRET_KEY;

/**
   * Stream client for video streaming.
   * @type {StreamClient}
   */

app.post('/getVideoToken', (req, res) => {
  const user = req.body;
  if (!user) {
    throw new Error("User not found");
  }
  if (!STREAM_VIDEO_API_KEY || !STREAM_VIDEO_SECRET_KEY) {
    throw new Error("Missing API Key");
  }
  const client = new StreamClient(STREAM_VIDEO_API_KEY, STREAM_VIDEO_SECRET_KEY);
  const date = new Date().getTime();
  const exp = Math.round(date / 1000) + 60 * 60;
  const issued = Math.floor(date / 1000) - 60;
  const token = (client.createToken(user.id, exp, issued));
  res.send(token);
});

app.post('/getChatToken', (req, res) => {
  const user = req.body;
  if (!user){
    throw new Error("User not found");
  }
  if (!STREAM_VIDEO_API_KEY || !STREAM_VIDEO_SECRET_KEY) {
    throw new Error("Missing API Key");
  }
  const client = new StreamClient(STREAM_VIDEO_API_KEY, STREAM_VIDEO_SECRET_KEY);
  const token = (client.createToken(user.id));
  res.send(token);
})

app.listen("3001", () => {
    console.log(`Server started on port 3001`);
});
