const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');

const app = express();

// Mock database
const database = {
    users: [
        {
            id: 12345332,
            name: "Brian",
            email: "brian@gmail.com",
            entries: 0,
            joined: new Date()
        }
    ],
    login: [
        {
            id: 12345332,
            password: "$2a$10$T98sG.xSGQHRb2MHOlVHPu1z1jACOKp8HFwuaD2sHJe4mSU2OYTym", // hashed password
            email: "brian@gmail.com"
        }
    ]
};

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

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
        if (result) {
            const user = database.users.find(user => user.email === email);
            if (user) {
                return res.json(user); // Send user data if password matches
            }
        } else {
            return res.status(400).json("Wrong password");
        }

        if (err) {
            return res.status(500).json("Error occurred during login");
        }
    });
});

// Register endpoint
app.post('/register', (req, res) => {
    const { name, email, password } = req.body;

    // Generate a unique user ID
    const newUserId = Date.now(); // Using the current timestamp as a unique ID

    bcrypt.hash(password, null, null, (err, hash) => {
        if (err) {
            return res.status(400).json("There was an error during registration");
        } else {
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
        }
    });
});

// Get user profile by ID
app.get('/profile/:userId', (req, res) => {
    const { userId } = req.params;

    const user = database.users.find(user => user.id === Number(userId));
    if (user) {
        res.json(user);
    } else {
        res.status(404).json("User not found");
    }
});

// Update user entries (e.g., for an image upload count)
app.put('/image', (req, res) => {
    const { id } = req.body;

    const user = database.users.find(user => user.id === Number(id));
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