const mongoose = require('mongoose');
const { Schema } = require('mongoose')

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        uniqe:true,
        index:true
    },

    password: {
        type: String,
        required: true
    },

    date: {
        type: Date,
        default: Date.now
    }

})

const User=mongoose.model('user',UserSchema)
// User.createIndexes( )
module.exports=User