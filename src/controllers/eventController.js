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
exports.getAllEvents = exports.createEvent = void 0;
const event_1 = __importDefault(require("../models/event"));
// Controller for handling event-related operations
// Controller function to create a new event
const createEvent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Extract event data from request body
        const eventData = req.body;
        // Create a new event using the Event model
        const event = yield event_1.default.create(eventData);
        // Send a success response with the created event data
        res.status(201).json({ event });
    }
    catch (error) {
        // Handle errors and send an error response
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});
exports.createEvent = createEvent;
// Controller function to get all events
const getAllEvents = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Fetch all events from the database
        const events = yield event_1.default.find();
        // Send a success response with the fetched events
        res.status(200).json({ events });
    }
    catch (error) {
        // Handle errors and send an error response
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});
exports.getAllEvents = getAllEvents;
