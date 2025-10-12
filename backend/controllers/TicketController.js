const { object } = require('joi');
const Ticket = require('../model/Ticket');

// Create a new ticket
exports.createTicket = async (req, res) => {
    try {
        const { product, description } = req.body;

        const ticket = new Ticket({
            product,
            description,
            user: req.user._id,
        });
        await ticket.save();
        res.status(201).json(ticket);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// Get all tickets for the authenticated user
exports.getTickets = async (req, res) => {
    try {
        const tickets = await Ticket.find({ user: req.user._id });
        res.status(200).json(tickets);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};
// Get a specific ticket by ID
exports.getTicketById = async (req, res) => {
    const { id } = req.params;

    try {
        const ticket = await Ticket.findById(id);
        if (!ticket) {
            return res.status(404).json({ message: 'Ticket not found' });
        }
        if (ticket.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Not authorized to view this ticket' });
        }
        res.status(200).json(ticket);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};
// Update a ticket by ID
exports.updateTicket = async (req, res) => {
    try {
        // find the ticket by ID    
        const { id } = req.params;
        const ticket = await Ticket.findById(id);
        if(!ticket){
            res.status(404).json({ message: 'Ticket not found' });
        }

        // check if ticket belongs to user
        if(ticket.user.toString() !== req.user._id.toString()){
            return res.status(403).json({ message: 'Not authorized to update this ticket' });
        }
        // check availablility of fields to be updated
        const {body} = req;
        if(!body || Object.keys(body).length===0){  
            return res.status(400).json({ message: "Please fill out the ticket details" });
        }
        // validate form fields        
        const { product, description, status } = req.body;
        if(status && !['new', 'open', 'closed'].includes(status)){
            return res.status(400).json({ message: "Invalid status value" });
        }

        if(product && !['Iphone 17', 'Galaxy Fold', 'Macbook Pro', 'Dell XPS', 'Surface Pro'].includes(product)){
            return res.status(400).json({ message: "Invalid product value" });
        }
        // update the ticket fields
        ticket.product = product || ticket.product;
        ticket.description = description || ticket.description;
        ticket.status = status || ticket.status;
        ticket.updatedAt = Date.now();
        // save the ticket
        await ticket.save();
        res.status(200).json(ticket);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// Delete a ticket by ID
exports.deleteTicket = async (req, res) => {
    try {
        // find the ticket by ID
        const ticket = await Ticket.findById(req.params.id);
        if (!ticket) {
            return res.status(404).json({ message: 'Ticket not found' });
        }

        // check if ticket belongs to user
        if (ticket.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Not authorized to delete this ticket' });
        }

        // delete the ticket
        await Ticket.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Ticket deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};
