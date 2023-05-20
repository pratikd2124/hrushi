const express = require('express');
const mongoose = require('mongoose');
// const User = require('../models/User');
const dotenv = require('dotenv');
const cors = require('cors');

const app = express();

dotenv.config();

// Use the cors middleware
const corsOptions = {
    origin: 'http://localhost:3000',
  };
  
  app.use(cors(corsOptions));

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(console.log("conected"))
    .catch((err) => {
    console.log(err);
});
;

 
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    CSN: {
        type: String,
        unique: true,
        required: true
    },
    Approved: {
        type: String,
        required: true,
        
    },
})

const User = mongoose.model('User', UserSchema);
// // Create a user schema
// const userSchema = new mongoose.Schema({
//   name: String,
//   CSN: Number,
//   Approved: Boolean,
// });

// const User = mongoose.model('User', userSchema);

// Parse JSON bodies
app.use(express.json());    

// Handle registration form submission
app.post('/api/register', async (req, res) => {
  try {
    // Create a new user based on the submitted data
    const user = new User(req.body);

    // Save the user to the database
    await user.save();

    res.status(201).json({ message: 'Registration successful!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred.' });
  }
});

// Start the server
app.listen(5000, () => {
  console.log('Server listening on port 5000');
});
