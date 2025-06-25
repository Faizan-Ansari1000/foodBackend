const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String
    },
    cnic: {
        type: String
    },
    role: {
        type: String,
        enums: 'user' | 'admin',
        default: 'user'
    }
})

const User = mongoose.model('user', userSchema);

module.exports = User;