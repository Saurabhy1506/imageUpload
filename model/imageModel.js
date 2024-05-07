const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
    imageUrl:{
        type:String
    },
    fileName:{
        type:String
    },  
    uploadDate:{
        type:Date
    }  
})

const imageModel = mongoose.model('image',imageSchema);
module.exports = {imageModel}