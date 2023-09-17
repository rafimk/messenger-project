const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const passport = require("passport");
const localStrategy = require("passport-local").Strategy;

const app = express();
const port = 8000;
const cors = require("cors");
app.use(cors());

app.use(bodyParser.urlencoded({ express: false }));
app.use(bodyParser.json());
app.use(passport.initialize());

const jwt = require("jsonwebtoken");

mongoose.connect(
    "connection string",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
).then(() => {
    console.log("Connected to Mongo DB");
}).catch((err) => {
    console.log("Error connecting to Mongo DB", err);
});

app.listen(port, () => {
    console.log("Server running on port 8000");
});

const User = require("./models/user");
const Message = require("./models/message");
const { hashPassword, verifyPassword } = require('./passwordUtils');

// Endpoint for registration of the user

// Register a new user
app.post("/register", async (req, res) => {
    const { name, email, password, image } = req.body;

    // Hash the password
    const { salt, hash } = await hashPassword(password);

    // Create a new User object
    const newUser = new User({
        name,
        email,
        passwordHash: hash, // Store the hashed password in the 'passwordHash' field
        passwordSalt: salt, // Store the salt used for hashing
        image // Corrected variable name
    });

    // Save the user to the database
    await newUser.save().then(() => {
        res.status(200).json({ message: "User registered successfully" });
    }).catch((error) => {
        console.error("Error registering user ", error);
        res.status(500).json({ message: "Error registering user" });
    });
});

// Function to create a token for the user
const createToken = (userId) => {
    // Set the token payload
    const payload = {
        userId: userId,
    };

    // Generate the token with a secret key and expiration time
    const token = jwt.sign(payload, "Q$r2K6W8n!jCW%Zk", { expiresIn: "1h" });

    return token;
};

// Endpoint for logging in of that particular user.
app.post("/login", async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(404).json({ message: "Email and the password are required" });
    }

    // Check for that user in the database.
    User.findOne({ email }).then(async (user) => {
        if (!user) {
            // User not found
            return res.status(404).json({ message: "Invalid username/password" });
        }

        // Compare the provided passwors with the password provided.
        const isPasswordValid = await verifyPassword(password, user.passwordSalt, user.passwordHash);
        if (!isPasswordValid) {
            return res.status(404).json({ message: "Invalid username/password" });
        }

        const token = createToken(user._id);
        res.status(200).json({ token });
    }).catch((error) => {
        console.log("Error finding the user ", error);
        res.status(500).json({ message: "Internal server error" });
    });
});