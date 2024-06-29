const express = require('express');
const mongoose = require('mongoose');
const UserModel = require('./models/User');
const cors = require('cors');
const TutorModel = require('./models/Tutor');

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
    const {image} = req.body;
    const {clerkId} = req.body;
    const {name} = req.body;

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

app.post(('/update'), (req, res) => {
    const { clerkId, email, name, image } = req.body;

    UserModel.findOneAndUpdate(
      { email: email },
      { clerkId, name, image },
      { new: true, upsert: true } // upsert: true will create a new document if no document matches the query
    )
      .then(user => res.json(user), console.log("User found successfully"))
      .catch(err => {
        console.error("Error during registration:", err);
        res.status(500).json({ error: "Internal server error" });
      });
});

app.post(('/updatePersonalInfo'), (req, res) => {
    const { clerkId, email, name, university, year, languages } = req.body;

    UserModel.findOneAndUpdate(
      { email: email },
      { clerkId, name, university, year, languages},
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

app.listen("3001", () => {
    console.log(`Server started on port 3001`);
});
