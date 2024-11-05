const SupportTicket = require('../models/supportTicket');

// Create a new support ticket
exports.createSupportTicket = async (req, res) => {
    try {
        const ticket = new SupportTicket(req.body);
        await ticket.save();
        res.status(201).send(ticket);
    } catch (error) {
        res.status(400).send(error);
    }
};

// List all support tickets
exports.listSupportTickets = async (req, res) => {
    try {
        const tickets = await SupportTicket.find().populate('userID');
        res.status(200).send(tickets);
    } catch (error) {
        res.status(500).send(error);
    }
};

// Get a support ticket by ID
exports.getSupportTicketById = async (req, res) => {
    try {
        const ticket = await SupportTicket.findById(req.params.id).populate('userID');
        if (!ticket) {
            return res.status(404).send();
        }
        res.status(200).send(ticket);
    } catch (error) {
        res.status(500).send(error);
    }
};

// Update a support ticket
exports.updateSupportTicket = async (req, res) => {
    try {
        const ticket = await SupportTicket.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!ticket) {
            return res.status(404).send();
        }
        res.status(200).send(ticket);
    } catch (error) {
        res.status(400).send(error);
    }
};

// Delete a support ticket
exports.deleteSupportTicket = async (req, res) => {
    try {
        const ticket = await SupportTicket.findByIdAndDelete(req.params.id);
        if (!ticket) {
            return res.status(404).send();
        }
        res.status(200).send(ticket);
    } catch (error) {
        res.status(500).send(error);
    }
};
