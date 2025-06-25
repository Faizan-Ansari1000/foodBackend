const mongoose = require('mongoose');

const itemSchema = mongoose.Schema({
    name:{
        type:String
    },
    image:{
        type:String
    },
    price:{
        type:String
    },
    quantity:{
        type:String
    },
    description:{
        type:String
    },
});

const ItemUpload = mongoose.model('Item',itemSchema);
module.exports = ItemUpload;