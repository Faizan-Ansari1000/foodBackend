const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');
const profileRoute = require('./routes/profileRoute');
const userRoute = require('./routes/userRoute');
const authRoute = require('./routes/authRoute');

const App = express();
const PORT = process.env.PORT || 5000;  

App.use(express.json());
App.use(cors());

// API routes
App.use('/authRoute',authRoute);
App.use('/profileRoute',profileRoute);
App.use('/userRoute',userRoute)

// Test route
App.get('/', (req, res) => {
    res.send('Welcome to Backend');
});

// DB Connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 30000,
})
    .then(() => {
        console.log('MongoDB Connected');
        App.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.error('MongoDB Connection Error:', err.message);
    });

module.exports = App;


