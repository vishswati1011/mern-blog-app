const mongoose = require('mongoose');
const User = new mongoose.Schema({
    username: {
        type: String,
    },
    email: {
        type: String,
    },
    password:{
        type:String
    },
    otp:{
        type:String
    },
    imageUrl:{
        type:String
    }, 
    mobileNo:{
        type:String
    }
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('users', User);


