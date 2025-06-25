const express = require('express');
const User = require('../models/userModel');
const bcrypt = require('bcrypt');

const authRoute = express.Router();

// signUp
authRoute.post('/signUp', async (req, res) => {
    const { name, email, password, cnic } = req.body;
    if (!name || !email || !password || !cnic) {
        return res.status(400).json({ successfull: false, message: 'Some Fields are missing' })
    }
    if (!email.includes('@')) {
        return res.status(409).json({ successfull: false, message: '@ is missing' })
    }
    try {
        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return res.status(404).json({ successfull: false, message: 'is email already exist' })
        }
        const hashPassword = await bcrypt.hash(password, 10)
        const newUser = new User({
            name,
            email,
            cnic,
            password: hashPassword
        })
        await newUser.save()
        return res.status(201).json({ successfull: true, message: 'Successfully Account Registered', data: newUser })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ successfull: false, message: 'Server error', error: error.message })
    }
})

// login

authRoute.post('/login', async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ successfull: false, message: 'Email & Password is required' })
    }
    try {
        if (email === 'feastoAdmin@gmail.com' && password === 'feasto') {
            return res.status(201).json({ successfull: true, message: 'Successfully Account LoggedIn Admin', role: 'admin' })
        }
        const existingUser = await User.findOne({ email })
        if (!existingUser) {
            return res.status(409).json({ successfull: false, message: 'Not Found your Email' })
        }
        const matchPassword = bcrypt.compare(password, existingUser.password);
        if (!matchPassword) {
            return res.status(404).json({ successfull: false, message: 'InValid Password' })
        }
        return res.status(201).json({ successfull: true, message: 'Successfully User LoggedIn', role: 'user' })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ successfull: false, message: 'Server error', error: error.message })
    }
});

// reset password
authRoute.post('/resetPassword', async (req, res) => {
    const { email, cnic, newPassword } = req.body;
    if (!email || cnic || !newPassword) {
        return res.status(400).json({ successfull: false, message: 'Email & new Password is must required' })
    }
    try {
        const existingUser = await User.findOne({ email, cnic })
        if (!existingUser) {
            return res.status(409).json({ successfull: false, message: 'Email not Found', })
        }
        const hashPassword = await bcrypt.hash(newPassword, 10);
        existingUser.password = hashPassword;
        await existingUser.save();
        return res.status(201).json({ successfull: true, message: 'Successfully Password Updated' })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ successfull: false, message: 'Server error', error: error.message })
    }
})


module.exports = authRoute;