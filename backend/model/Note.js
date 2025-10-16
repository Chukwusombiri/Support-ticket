const { required } = require('joi');
const mongoose = require('mongoose');

const NoteSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    ticket: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Ticket',
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    isStaff: {
        type: Boolean,        
        default: false
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Note', NoteSchema)