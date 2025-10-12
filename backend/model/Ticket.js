const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
    product: {
        type: String,
        required: true,
        enum: ['Iphone 17', 'Galaxy Fold', 'Macbook Pro', 'Dell XPS', 'Surface Pro'],
    },
    description: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['open', 'in progress', 'closed'],
        default: 'open',
        required: true,
    },
    priority: {
        type: String,
        enum: ['low', 'medium', 'high'],
        default: 'medium',
        required: true,
    },    
    assignedTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model('Ticket', ticketSchema);