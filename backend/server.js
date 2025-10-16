const express = require('express');
const path = require('path');
const { errorHandler } = require('./middlewares/ErrorMiddleware');
require('colors');
const dotenv = require('dotenv').config({ debug: true });
const { connectDB } = require('./config/dbMongoose');
const authRoutes = require('./routes/AuthRoutes');
const profileRoutes = require('./routes/ProfileRoutes');
const ticketRoutes = require('./routes/TicketRoutes');

const PORT = process.env.APP_PORT
const cors = require("cors");
const { build } = require('joi');

// intialize express
const app = express();


//app start
(async () => {
    await connectDB();
    app.listen(PORT, () => console.log(`App listening on port ${PORT}`.cyan));
})()

//general middlewares
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.use('/api', authRoutes);
app.use('/api/profile', profileRoutes)
app.use('/api/tickets', ticketRoutes);


//serve static app frontend
if (process.env.APP_ENV == 'production') {
    app.use(express.static(path.join(__dirname, '../frontend/build')))

    // entry point
    app.get('*', (req, res) => res.sendFile(__dirname, '../', 'frontend', 'build', 'index.html'))
} else {
    app.get('/', (req, res) => res.status(200).json({ message: "Welcome to Support Desk API" }))
}
// error handle
app.use(errorHandler)