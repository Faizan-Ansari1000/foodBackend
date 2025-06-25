const mongoose = require('mongoose');

const OrderPlace = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    dish: {
        type: String,
        required: true
    },
    quantity: {
        type: String,
        required: true
    },
});

const Place =mongoose.model('OrderPlace',OrderPlace);
module.exports = Place