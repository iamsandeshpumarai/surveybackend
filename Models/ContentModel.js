const mongoose = require('mongoose');
const contentSchema = new mongoose.Schema({
titleNp:{
    type:String,
    required:true
},
titleEn:{
    type:String,
    required:true   },
    subtitle:{
        type:String,
        required:true  
    },
    greeting:{
        type:String,
        required:true},
        

description:{
    type:String,
    required:true   }
})

const contentModel = mongoose.model('Content',contentSchema)
module.exports = contentModel