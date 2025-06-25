const express = require('express');
const ItemUpload = require('../models/ItemModel');
const Place = require('../models/OrderPlace');

const userRoute = express.Router();

// product Upload;
userRoute.post('/products', async (req, res) => {
    const { name, price, image, description, quantity } = req.body;
    if (!name || !price || !image) {
        return res.status(400).json({ successfully: false, message: 'Some Fields are missing' })
    }
    try {
        const postProduct = await ItemUpload.create({ name, price, image, description, quantity })
        return res.status(201).json({ successfully: 'Successfully Product Upload', data: postProduct })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ successfully: alse, message: 'Server error', error: error.message })
    }
});
// get 
userRoute.get('/products', async (req, res) => {
    try {
        const getItems = await ItemUpload.find();
        if (getItems.length == 0) {
            return res.status(404).json({ successfully: false, message: 'NOt Found Items' })
        }
        return res.status(200).json({ successfully: true, mesage: 'Successfully All Foodie Item Get', data: getItems })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ successfully: alse, message: 'Server error', error: error.message })
    }
})


// order post
userRoute.post('/placeOrder', async (req, res) => {
    const { name, email, address, dish, quantity, phone } = req.body;
    if (!name || !email || !address || !dish || !quantity || !phone) {
        return res.status(400).json({ successfully: false, message: 'All Fields are required' })
    }
    try {
        const postOrder = await Place.create({ name, email, address, dish, quantity, phone })
        return res.status(201).json({ successfully: true, message: 'Successfully Place Order', data: postOrder })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ successfully: alse, message: 'Server error', error: error.message })
    }
})

// get order
userRoute.get('/placeOrder', async (req, res) => {
    try {
        const getOrders = await Place.find()
        if (getOrders.length == 0) {
            return res.status(400).json({ successfully: false, message: 'Not Found Orders' })
        }
        return res.status(200).json({ successfully: true, message: 'Successfully All Orders Get', data: getOrders })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ successfully: alse, message: 'Server error', error: error.message })
    }
})

module.exports = userRoute;