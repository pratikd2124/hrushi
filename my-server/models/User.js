const mongoose = require('mongoose');
 
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    CSN: {
        type: String,
        unique: true,
        required: true
    },
    Approved: {
        type: Boolean,
        required: true,
        
    },
})

module.exports = mongoose.model('User', UserSchema);