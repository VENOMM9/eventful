"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTicketController = exports.updateTicketController = exports.getAllTicketsController = exports.getDashboardController = exports.getTicketDetailsController = exports.createTicketController = void 0;
const ticketService_1 = require("../services/ticketService");
const QRCodeGenerator_1 = require("../utils/QRCodeGenerator");
const path_1 = __importDefault(require("path"));
const ticket_1 = __importDefault(require("../models/ticket")); // Import the Ticket model
const event_1 = __importDefault(require("../models/event")); // Import the Ticket model
const createTicketController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const _a = req.body, { userId } = _a, ticketData = __rest(_a, ["userId"]);
        console.log(userId);
        console.log('Ticket Data:', ticketData); // Log ticketData here
        // Fetch events data from the database
        const events = yield event_1.default.find();
        // Create ticket
        ticketData.userId = userId;
        const createdTicket = yield (0, ticketService_1.createTickets)(ticketData);
        // Generate QR code and URL
        const qrCodeData = JSON.stringify(createdTicket);
        const qrCodeFileName = `ticket_${createdTicket._id}.png`;
        const qrCodeDirectory = path_1.default.join(__dirname, '..', 'public', 'qr_codes');
        const qrCodeFilePath = path_1.default.join(qrCodeDirectory, qrCodeFileName);
        const qrCode = yield (0, QRCodeGenerator_1.generateQRCode)(qrCodeData, qrCodeFilePath);
        const qrCodeURL = `/qr_codes/${qrCodeFileName}`;
        console.log(qrCodeFilePath);
        console.log(qrCode);
        console.log(qrCodeData);
        // Render create-ticket template with data
        res.render('ticket-details', { events, ticket: createdTicket, qrCodeURL, qrCode });
    }
    catch (error) {
        console.error('Error creating ticket:', error);
        res.status(500).json({ message: 'Failed to create ticket' });
    }
});
exports.createTicketController = createTicketController;
const getTicketDetailsController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { ticketId } = req.params;
        const ticket = yield (0, ticketService_1.getTicketById)(ticketId);
        if (!ticket) {
            return res.status(404).json({ message: 'Ticket not found' });
        }
        res.render('ticket-details', { ticket });
    }
    catch (error) {
        console.error('Error fetching ticket details:', error);
        res.status(500).json({ message: 'Failed to fetch ticket details' });
    }
});
exports.getTicketDetailsController = getTicketDetailsController;
const getDashboardController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Calculate total tickets sold and total revenue
        const tickets = yield ticket_1.default.find();
        const totalTicketsSold = tickets.reduce((acc, ticket) => acc + ticket.quantity, 0);
        const totalRevenue = tickets.reduce((acc, ticket) => acc + ticket.price * ticket.quantity, 0);
        // Count total events
        const totalEvents = yield event_1.default.countDocuments();
        // Render the dashboard view with calculated statistics
        res.render('dashboard', { totalTicketsSold, totalRevenue, totalEvents });
    }
    catch (error) {
        console.error('Error fetching data for dashboard:', error);
        res.status(500).json({ message: 'Failed to fetch data for dashboard' });
    }
});
exports.getDashboardController = getDashboardController;
const getAllTicketsController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tickets = yield (0, ticketService_1.getAllTickets)();
        res.render('alltickets', { tickets });
    }
    catch (error) {
        console.error('Error fetching tickets:', error);
        res.status(500).json({ message: 'Failed to fetch tickets' });
    }
});
exports.getAllTicketsController = getAllTicketsController;
const updateTicketController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { ticketId } = req.params;
        const updatedTicket = yield ticket_1.default.findByIdAndUpdate(ticketId, req.body, { new: true });
        if (!updatedTicket) {
            return res.status(404).json({ message: 'Ticket not found' });
        }
        res.render('update-ticket', { ticket: updatedTicket });
    }
    catch (error) {
        console.error('Error updating ticket:', error);
        res.status(500).json({ message: 'Failed to update ticket' });
    }
});
exports.updateTicketController = updateTicketController;
const deleteTicketController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { ticketId } = req.params;
        const deletedTicket = yield ticket_1.default.findByIdAndDelete(ticketId);
        if (!deletedTicket) {
            return res.status(404).json({ message: 'Ticket not found' });
        }
        res.render('delete-ticket', { ticket: deletedTicket });
    }
    catch (error) {
        console.error('Error deleting ticket:', error);
        res.status(500).json({ message: 'Failed to delete ticket' });
    }
});
exports.deleteTicketController = deleteTicketController;
