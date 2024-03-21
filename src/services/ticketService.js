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
exports.deleteTickets = exports.getTicketById = exports.updateTickets = exports.getAllTickets = exports.createTickets = void 0;
const ticket_1 = __importDefault(require("../models/ticket"));
function createTickets(ticketData) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const ticket = yield ticket_1.default.create(ticketData);
            return ticket;
        }
        catch (error) {
            console.error('Error creating ticket:', error);
            throw new Error('Error creating ticket');
        }
    });
}
exports.createTickets = createTickets;
function getAllTickets() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const tickets = yield ticket_1.default.find().populate('eventId').populate('userId').exec();
            return tickets;
        }
        catch (error) {
            throw new Error('Error fetching tickets');
        }
    });
}
exports.getAllTickets = getAllTickets;
function updateTickets(ticketId, updatedData) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const updatedTicket = yield ticket_1.default.findByIdAndUpdate(ticketId, updatedData, { new: true });
            if (!updatedTicket) {
                throw new Error('Ticket not found');
            }
            return updatedTicket;
        }
        catch (error) {
            throw new Error('Failed to update ticket');
        }
    });
}
exports.updateTickets = updateTickets;
const getTicketById = (ticketId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield ticket_1.default.findById(ticketId);
    }
    catch (error) {
        throw new Error('Error fetching ticket by ID');
    }
});
exports.getTicketById = getTicketById;
function deleteTickets(ticketId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const deletedTicket = yield ticket_1.default.findByIdAndDelete(ticketId);
            if (!deletedTicket) {
                throw new Error('Ticket not found');
            }
            return deletedTicket;
        }
        catch (error) {
            throw new Error('Failed to delete ticket');
        }
    });
}
exports.deleteTickets = deleteTickets;
