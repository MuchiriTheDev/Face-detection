const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid'); // Import UUID for unique IDs

const app = express();

// Mock database
const database = {
    users: [
        {
            id: uuidv4(),
            name: "Brian",
            email: "brian@gmail.com",
            entries: 0,
            joined: new Date()
        }
    ],
    login: [
        {
            id: uuidv4(),
            password: "$2a$10$T98sG.xSGQHRb2MHOlVHPu1z1jACOKp8HFwuaD2sHJe4mSU2OYTym", // hashed password
            email: "brian@gmail.com"
        }
    ]
};

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors({ origin: 'https://face-detection-app-swart.vercel.app' })); // Set your frontend origin here

// Test endpoint to check if the API is running
app.get('/', (req, res) => {
    res.send(database);
});

// Signing endpoint (login)
app.post('/signing', (req, res) => {
    const { email, password } = req.body;

    const loginData = database.login.find(logs => logs.email === email);
    if (!loginData) {
        return res.status(400).json("User not found");
    }

    bcrypt.compare(password, loginData.password, (err, result) => {
        if (err) {
            return res.status(500).json("Error occurred during login");
        }
        if (result) {
            const user = database.users.find(user => user.email === email);
            return res.json(user); // Send user data if password matches
        } else {
            return res.status(400).json("Wrong password");
        }
    });
});

// Register endpoint
app.post('/register', (req, res) => {
    const { name, email, password } = req.body;

    // Generate a unique user ID
    const newUserId = uuidv4();

    bcrypt.hash(password, null, null, (err, hash) => {
        if (err) {
            return res.status(400).json("There was an error during registration");
        }

        // Add new login entry
        database.login.push({
            id: newUserId,
            password: hash,
            email: email,
        });

        // Add new user entry
        database.users.push({
            id: newUserId,
            name: name,
            email: email,
            entries: 0,
            joined: new Date()
        });

        res.json(database.users[database.users.length - 1]); // Send the new user data
    });
});

// Get user profile by ID
app.get('/profile/:userId', (req, res) => {
    const { userId } = req.params;

    const user = database.users.find(user => user.id === userId);
    if (user) {
        res.json(user);
    } else {
        res.status(404).json("User not found");
    }
});

// Update user entries (e.g., for an image upload count)
app.put('/image', (req, res) => {
    const { id } = req.body;

    const user = database.users.find(user => user.id === id);
    if (user) {
        user.entries++;
        res.json(user.entries); // Return the updated number of entries
    } else {
        res.status(404).json("User not found");
    }
});

// Start server
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});