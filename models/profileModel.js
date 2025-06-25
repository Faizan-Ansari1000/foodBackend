const mongoose = require('mongoose');

const profileSchema = mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String,
        required: true
    },
    dob: {
        type: String
    },
    gender: {
        type: String
    },
    address: {
        type: String,
        required: true
    },
    phone: {
        type: String,
    },
    image: {
        type: String
    }
})

const Profile = mongoose.model('profile', profileSchema);
module.exports = Profile;