const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const UserModel = require('./models/User');
const path = require('path'); // Import the path module
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

// Configure multer for file storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage: storage });

// Endpoint to handle image upload
app.post('/upload', upload.single('profileImage'), (req, res) => {
  const { email, name } = req.body;
  const imageUrl = req.file.path;

  // Save user data with image URL to the database
  UserModel.findOneAndUpdate(
      { email: email },
      { name, image: imageUrl },
      { new: true, upsert: true } // upsert: true will create a new document if no document matches the query
  )
      .then(user => res.json(user))
      .catch(error => res.status(500).json({ error: 'Error saving user with image' }));
});

// Endpoint to retrieve user data
app.get('/user/:email', (req, res) => {
  const { email } = req.params;

  UserModel.findOne({ email: email })
      .then(user => {
          if (user) {
              res.json(user);
          } else {
              res.status(404).json({ error: 'User not found' });
          }
      })
      .catch(error => res.status(500).json({ error: 'Error retrieving user' }));
});

// Serve static files from the uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

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

app.get('/gettutors', async (req, res) => {
  try {
    const tutors = await TutorModel.find();
    res.json(tutors);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching tutors' });
  }
});

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


app.listen("3001", () => {
    console.log(`Server started on port 3001`);
});
