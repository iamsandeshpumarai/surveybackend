const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    username:String,
    password:String,
    email:{
        type:String,
        unique:true
    },
    role:{
        type:[String],
        enum:['user','admin'],
        default:'user'
    }
},{timestamps:true})

const userModel = mongoose.model('User',userSchema)
module.exports = userModel
