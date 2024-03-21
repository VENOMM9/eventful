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
exports.deleteEvent = exports.UpdateEvent = exports.getOneEvent = exports.getAllEvents = exports.postCreateEvent = void 0;
const eventService_1 = require("../services/eventService");
const event_1 = __importDefault(require("../models/event"));
function postCreateEvent(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { name, description, date, location } = req.body;
            const event = yield (0, eventService_1.createEvent)(name, description, date, location);
            res.status(201).json({ event, message: 'Event created successfully' });
        }
        catch (error) {
            res.status(500).json({ message: 'Event creation failed' });
        }
    });
}
exports.postCreateEvent = postCreateEvent;
function getAllEvents(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const events = yield (0, eventService_1.fetchAllEvents)();
            res.status(200).json({ events, message: 'All events available' });
        }
        catch (error) {
            res.status(500).json({ message: 'Failed to fetch events' });
        }
    });
}
exports.getAllEvents = getAllEvents;
function getOneEvent(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const eventId = req.params.eventId;
            const event = yield (0, eventService_1.getEventById)(eventId);
            res.status(200).json({ event });
        }
        catch (error) {
            res.status(500).json({ message: 'Failed to fetch event' });
        }
    });
}
exports.getOneEvent = getOneEvent;
// Update an existing event
function UpdateEvent(eventId, updatedData) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const updatedEvent = yield event_1.default.findByIdAndUpdate(eventId, updatedData, { new: true });
            if (!updatedEvent) {
                throw new Error('Event not found');
            }
            return updatedEvent;
        }
        catch (error) {
            throw new Error('Failed to update event');
        }
    });
}
exports.UpdateEvent = UpdateEvent;
function deleteEvent(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const eventId = req.params.eventId;
            const deletedEvent = yield (0, eventService_1.deleteEventById)(eventId);
            res.status(200).json({ deletedEvent, message: 'Event deleted successfully' });
        }
        catch (error) {
            res.status(500).json({ message: 'Failed to delete event' });
        }
    });
}
exports.deleteEvent = deleteEvent;
