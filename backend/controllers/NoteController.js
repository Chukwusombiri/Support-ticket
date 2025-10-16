const Note = require("../model/Note");
const Ticket = require("../model/Ticket");


// @route api/tickets/ticketId/notes
// @desc Fetch all notes related to a ticket
// @method GET 
exports.getNotes = async (req, res) => {
    const { ticketId } = req.params;
    try {
        const ticket = await Ticket.findById(ticketId);
        if (!ticket) {
            return res.status(404).json({
                message: 'Couldn\'t find ticket with id: ' + ticketId
            });
        }

        if (ticket.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Not authorized to access this ticket notes' });
        }

        const notes = await Note.find({ ticket: ticket._id });
        res.status(200).json(notes);
    } catch (error) {
        return res.status(500).json({ message: 'Server Error', error: error.message })
    }
}

// @route api/tickets/ticketId/notes/noteID
// @desc Fetch all notes related to a ticket
// @method GET 
exports.getNoteById = async (req, res) => {
    const { ticketId, noteId } = req.params;
    try {
        const ticket = await Ticket.findById(ticketId);
        if (!ticket) {
            return res.status(404).json({
                message: 'Couldn\'t find ticket with id: ' + ticketId
            });
        }

        if (ticket.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Not authorized to access this ticket note' });
        }

        const note = await Note.findById(noteId);
        res.status(200).json(note);
    } catch (error) {
        return res.status(500).json({ message: 'Server Error', error: error.message })
    }
}

// @route api/tickets/ticketId/notes
// @desc Fetch all notes related to a ticket
// @method POST 
exports.createNote = async (req, res) => {
    try {
        const { ticketId } = req.params;
        const { text } = req.body;

        const ticket = await Ticket.findById(ticketId);

        if (!ticket) {
            return res.status(404).json({
                message: 'Couldn\'t find ticket with id: ' + ticketId
            });
        }

        if (ticket.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Not authorized to create note for ticket: ' + ticketId });
        }

        const note = await Note.create({
            text,
            ticket: ticketId,
            user: req.user._id,            
        })

        return res.status(200).json(note);
    } catch (error) {
        return res.status(500).json({ message: 'Server Error', error: error.message })
    }
}

// @route api/notes
// @desc Fetch all notes related to a ticket
// @method PUT 
exports.updateNote = async (req, res) => {

}