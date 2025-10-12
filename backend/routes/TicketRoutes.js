const router = require('express').Router();
const {
    createTicket,
    getTickets,
    getTicketById,
    updateTicket,
    deleteTicket,
} = require('../controllers/TicketController');
const authProtect = require('../middlewares/AuthMiddleware');
const { validateTicket, validateObjectId } = require('../middlewares/validationMiddleware');

// Create a new ticket
router.post('/', authProtect, validateTicket, createTicket);
// Get all tickets for the authenticated user
router.get('/', authProtect, getTickets);
// Get a specific ticket by ID
router.get('/:id', authProtect,validateObjectId('id'), getTicketById);
// Update a ticket by ID
router.put('/:id', authProtect,validateObjectId('id'), updateTicket);
// Delete a ticket by ID
router.delete('/:id', authProtect,validateObjectId('id'), deleteTicket);

module.exports = router;