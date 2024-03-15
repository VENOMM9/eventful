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
const ticket_1 = __importDefault(require("../models/ticket"));
const createTicket = (ticketData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const ticket = yield ticket_1.default.create(ticketData);
        return ticket;
    }
    catch (error) {
        console.error('Error creating ticket:', error);
        throw new Error('Error creating ticket');
    }
});
const getAllTickets = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Find all tickets
        const tickets = yield ticket_1.default.find()
            .populate('eventId')
            .populate('userId')
            .exec(); // Execute the query
        return tickets;
    }
    catch (error) {
        throw new Error('Error fetching tickets');
    }
});
exports.default = { createTicket, getAllTickets };
