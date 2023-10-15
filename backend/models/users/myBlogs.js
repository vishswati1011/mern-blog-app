const mongoose = require('mongoose');
const MyCourse = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
    },
    blogId: {
        type: String,
    }
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('mycourse', MyCourse);


