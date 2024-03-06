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
exports.getAllTickets = exports.createTicket = void 0;
const ticket_1 = __importDefault(require("../models/ticket"));
// Controller for handling ticket-related operations
// Controller function to create a new ticket
const createTicket = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Extract ticket data from request body
        const ticketData = req.body;
        // Create a new ticket using the Ticket model
        const ticket = yield ticket_1.default.create(ticketData);
        // Send a success response with the created ticket data
        res.status(201).json({ ticket });
    }
    catch (error) {
        // Handle errors and send an error response
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});
exports.createTicket = createTicket;
// Controller function to get all tickets
const getAllTickets = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Fetch all tickets from the database
        const tickets = yield ticket_1.default.find();
        // Send a success response with the fetched tickets
        res.status(200).json({ tickets });
    }
    catch (error) {
        // Handle errors and send an error response
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});
exports.getAllTickets = getAllTickets;
