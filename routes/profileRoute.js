const express = require('express');
const User = require('../models/userModel');
const Profile = require('../models/profileModel');

const profileRoute = express.Router();

// post
profileRoute.post('/profile', async (req, res) => {
    const { name, email, gender, phone, dob, address, image } = req.body;
    if (!name || !email || !gender || !phone || !dob || !address) {
        return res.status(400).json({ successfull: false, message: 'Validation error' })
    }
    try {
        const checkUser = await User.findOne({ email });
        if (!checkUser) {
            return res.status(400).json({ successfull: false, mssage: 'Not Found Your Registration email' })
        }
        const existingProfile = await Profile.findOne({ email })
        if (existingProfile) {
            return res.status(404).json({ successfull: false, message: 'email already exist' })
        }
        const newProfile = new Profile({
            name,
            email,
            gender,
            phone,
            dob,
            address,
            image
        })
        await newProfile.save();
        return res.status(201).json({ successfull: true, message: 'Successfully Profile created', data: newProfile })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ successfull: false, message: 'Server error', error: error.message })
    }
})

// get all account
profileRoute.get('/profile', async (req, res) => {
    try {
        const getProfiles = await Profile.find()
        if (getProfiles.length == 0) {
            return res.status(400).json({ successfull: false, message: 'Not Found the Profiles' })
        }
        return res.status(200).json({ successfull: true, message: 'All Profiles Get', data: getProfiles })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ successfull: false, message: 'Server error', error: error.message })
    }
});

// delete all acount
profileRoute.delete('/profile', async (req, res) => {
    try {
        const deleteAccounts = await Profile.deleteMany({});
        if (!deleteAccounts) {
            return res.status(400).json({ successfull: false, message: 'No Account Delete' })
        }
        return res.status(201).json({ successfull: true, message: 'All Accounts Succesfully Delete' })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ successfull: false, message: 'Server error', error: error.message })
    }
});

// get one profile
profileRoute.get('/profile/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const getProfile = await Profile.findById(id);
        if (!getProfile) {
            return res.status(400).json({ successfull: false, message: 'Cant Find the Profile' })
        }
        return res.status(200).json({ successfull: true, messag: 'Successfully Profile Found', data: getProfile })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ successfull: false, message: 'Server error', error: error.message })
    }
})


// put account 
profileRoute.put('/profile/:id', async (req, res) => {
    const id = req.params.id;
    const body = req.body;
    try {
        const updateProfile = await Profile.findByIdAndUpdate(id, body, { new: true });
        if (!updateProfile) {
            return res.status(400).json({ successfull: false, message: 'Not Updated Profile' })
        }
        return res.status(201).json({ successfull: true, message: 'Successfully Profile Updated', data: updateProfile })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ successfull: false, message: 'Server error', error: error.message })
    }
})

// delete profile;
profileRoute.delete('/profile/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const deleteProfile = await Profile.findByIdAndDelete(id);
        if (!deleteProfile) {
            return res.status(404).json({ successfull: false, message: 'No Account Deleted' })
        }
        return res.status(201).json({ successfull: true, message: 'Successfully Profile Delete' })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ successfull: false, message: 'Server error', error: error.message })
    }
})

module.exports = profileRoute;