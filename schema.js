const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    id:{
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String, 
        required: true
    },
    email: {
        type: String,
        required: true
    }
})
const User = mongoose.model('users', userSchema);
module.exports = User