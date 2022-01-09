const mongoose = require('mongoose')
const { Schema } = mongoose;
const userSchema = new Schema({
    firstName:{
        type:String,
        required:true,
        min:5,
        max:50
    },
    lastName:{
        type:String,
        min:5,
        max:50,
        required:true,
    },
    email:{
        type:String,
        min:8,
        max:20,
        required:true,
    },
    password:{
        type:String,
        min:8,
        max:50,
        required:true,
    },
    profession:{
        type:String,
        min:3,
        max:50,
        required:true,
    },
    imgUrl:{
        type:String,
        min:8,
        max:50,
        required:true,
    },
  

},{timestamps:true})

module.exports = mongoose.model('User',userSchema)