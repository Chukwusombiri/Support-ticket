const mongoose = require('mongoose');

const User = new mongoose.Schema({
    name: {
        type: 'string',
        required: [true, 'Please provide your name']
    },
    email: {
        type: 'string',
        required: [true, 'Please provide a valid email'],
        unique: true
    },
    password: {
        type: 'string',
        required: [true, 'Please provide a password']
    },
    isAdmin: {
        type: 'boolean',
        default: false
    },
}, {
    timestamps: true
})


module.exports = mongoose.model('User', User)