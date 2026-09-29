const mongoose = require('mongoose');

const prodSchema = new mongoose.Schema({
    name:{
        type:String,
        unique:true
    },
    category:{
        type:String
    },
    price:{
        type:Number
    }
})

const schema = mongoose.model('ProductModel', prodSchema);

module.exports = schema;