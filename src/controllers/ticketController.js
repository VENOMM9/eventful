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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ticketService_1 = __importDefault(require("../services/ticketService"));
const QRCodeGenerator_1 = require("../utils/QRCodeGenerator");
const eventService_1 = __importDefault(require("../services/eventService"));
const authService_1 = __importDefault(require("../services/authService")); // Import the userService
const createTicket = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Fetch event and user data from the database
        const events = yield eventService_1.default.fetchAllEvents();
        const users = yield authService_1.default.getAllUsers();
        // Generate a QR code for the ticket
        const ticketData = {
            eventId: req.body.eventId,
            userId: req.body.userId,
            ticketType: req.body.ticketType,
            price: req.body.price,
            quantity: req.body.quantity,
        };
        // Generate a unique filename for the QR code
        const fileName = `ticket_${Date.now()}.png`;
        // Generate the QR code and save it to a file
        yield (0, QRCodeGenerator_1.generateQRCode)(JSON.stringify(ticketData), fileName);
        // Get the URL for the QR code
        const qrCodeUrl = `/utils/qr_codes/${fileName}`;
        // Create the ticket in the database
        const ticket = yield ticketService_1.default.createTicket(ticketData);
        // Pass event, user, and ticket data to the view for rendering the form
        return res.render('create-ticket', { events, users, ticket, qrCodeUrl });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to create ticket' });
    }
});
const getAllTickets = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tickets = yield ticketService_1.default.getAllTickets();
        res.status(200).json({ tickets });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to fetch tickets' });
    }
});
exports.default = { createTicket, getAllTickets };
