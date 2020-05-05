const mongoose = require ('mongoose');

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    token: {type: String, required:false},
    email: {
        type: String, 
        required: true, 
        unique:true, 
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    username: {type: String, required: true, unique:true},
    password: {type: String, required: true},
    userType: {type: String, required: true},
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    mobileNumber: {type: String, required: false},
    pic: {type: String, required: false},
    isActivated:{type: Boolean, required: true},
});

module.exports = mongoose.model('users', userSchema);