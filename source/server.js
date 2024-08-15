import cors from 'cors';
import express from 'express';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import { connectToDB, db } from './db.js'; // Ensure this path is correct
import { ObjectId } from 'mongodb';
import chalk from 'chalk'; // Import chalk

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Simple route to confirm the server is running
app.get('/', (req, res) => {
    res.json("Server is running successfully!");
});

// Set up Nodemailer transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD
    }
});

// Route to handle login
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    // Basic validation
    if (!email || !password) {
        return res.status(400).json({ error: 'Both email and password are required.' });
    }

    try {
        const user = await db.collection('login').findOne({ email });

        if (user && user.password === password) {
            res.json({ message: 'Login successful!' });
        } else {
            res.status(401).json({ error: 'Invalid email or password.' });
        }
    } catch (error) {
        console.error(chalk.red('Login failed:'), error); // Use chalk to colorize error messages
        res.status(500).json({ error: 'Login failed. Please try again.' });
    }
});

// Route to handle event registration
app.post('/register', async (req, res) => {
    const { firstName, lastName, email, phone, agree, eventName, emailReminder } = req.body;

    if (!firstName || !lastName || !email || !phone || !agree || !eventName) {
        return res.status(400).json({ error: 'All fields are required and you must agree to the health terms.' });
    }

    try {
        // Save registration to the database
        const result = await db.collection('registrations').insertOne({
            firstName,
            lastName,
            email,
            phone,
            agree,
            eventName,
            registrationDate: new Date(),
        });

    // Construct the email content
        const mailOptions = {
            from: process.env.EMAIL, // Use environment variable
            to: email,
            subject: 'Event Registration Confirmation',
            text: `Hi ${firstName},\n\nThank you for registering for ${eventName}!\n\nBest regards,\nEvent Team`,
        };

        if (emailReminder) {
            mailOptions.text += `\n\nYou will receive email reminders about this event.`;
        }

        // Send confirmation email
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error sending email:', error);
                return res.status(500).json({ error: 'Registration successful, but failed to send confirmation email.' });
            }
            console.log('Email sent:', info.response);
            res.json({ message: 'Registered successfully! Confirmation email sent.' });
        });
        
    } catch (error) {
        console.error('Registration failed:', error);
        res.status(500).json({ error: 'Registration failed. Please try again.' });
    }
});

// Event Management Routes
app.get('/events', async (req, res) => {
    try {
        const events = await db.collection('events').find().toArray();
        res.status(200).json(events);
    } catch (error) {
        console.error(chalk.red('Failed to fetch events:'), error);
        res.status(500).json({ error: 'Failed to fetch events' });
    }
});

app.post('/events', async (req, res) => {
    try {
        const newEvent = req.body;
        await db.collection('events').insertOne(newEvent);
        res.status(201).json(newEvent);
    } catch (error) {
        console.error(chalk.red('Failed to add event:'), error);
        res.status(500).json({ error: 'Failed to add event' });
    }
});

app.patch('/events/:id/postpone', async (req, res) => {
    try {
        const { newDate } = req.body;
        const event = await db.collection('events').findOneAndUpdate(
            { _id: ObjectId(req.params.id) },
            { $set: { eventDate: newDate } },
            { returnDocument: 'after' }
        );
        res.status(200).json(event.value);
    } catch (error) {
        console.error(chalk.red('Failed to postpone event:'), error);
        res.status(500).json({ error: 'Failed to postpone event' });
    }
});

app.delete('/events/:id', async (req, res) => {
    try {
        await db.collection('events').deleteOne({ _id: ObjectId(req.params.id) });
        res.status(200).json({ message: 'Event canceled' });
    } catch (error) {
        console.error(chalk.red('Failed to cancel event:'), error);
        res.status(500).json({ error: 'Failed to cancel event' });
    }
});

// Route to handle reviews
// Route to handle reviews
app.post('/reviews', async (req, res) => {
    const { user, reviews } = req.body;

    // Validate the input
    if (!user || !reviews) {
        return res.status(400).json({ error: 'All fields are required.' });
    }

    try {
        // Save the review to the database
        const result = await db.collection('login').insertOne({
            user,
            reviews,
            date: new Date(),
        });

        // Check if the review was successfully inserted
        if (result.acknowledged && result.insertedId) {
            return res.status(201).json({ message: 'Review added successfully', reviewId: result.insertedId });
        } else {
            throw new Error('Failed to add review');
        }
    } catch (error) {
        console.error(chalk.red('Failed to add review:'), error);
        return res.status(500).json({ error: 'Failed to add review' });
    }
});


connectToDB(() => {
    app.listen(9000, () => {
        console.log(chalk.green("Server running at port 9000"));
    });
});
