"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
// Define enum for ticket types
var TicketType;
(function (TicketType) {
    TicketType["VIP"] = "VIP";
    TicketType["Regular"] = "Regular";
    TicketType["Premium"] = "Premium";
    // Add more ticket types as needed
})(TicketType || (TicketType = {}));
const ticketSchema = new mongoose_1.Schema({
    eventId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Event' },
    userId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User' },
    ticketType: { type: String, enum: Object.values(TicketType) }, // Define ticket type as enum
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    // Add other fields as needed
});
const TicketModel = mongoose_1.default.model('Ticket', ticketSchema);
exports.default = TicketModel;
