const express = require('express');
const supportTicketController = require('../controllers/supportTicketController');

const router = express.Router();

// Create a new support ticket
router.post('/', supportTicketController.createSupportTicket);

// Get a list of all support tickets
router.get('/', supportTicketController.listSupportTickets);

// Get a single support ticket by ID
router.get('/:id', supportTicketController.getSupportTicketById);

// Update a support ticket by ID
router.put('/:id', supportTicketController.updateSupportTicket);

// Delete a support ticket by ID
router.delete('/:id', supportTicketController.deleteSupportTicket);

module.exports = router;
