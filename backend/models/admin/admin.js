const mongoose = require('mongoose');
const admin = new mongoose.Schema({
    adminname: {
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
    }
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('admin', admin);


