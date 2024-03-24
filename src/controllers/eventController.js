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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteEvent = exports.updateEvent = exports.getOneEvent = exports.getAllEvents = exports.postCreateEvent = void 0;
const eventService_1 = require("../services/eventService");
function postCreateEvent(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { name, description, date, time, location } = req.body;
            yield (0, eventService_1.createEvent)(name, description, date, time, location);
            // Redirect to the events route after creating the event
            res.redirect('/events');
        }
        catch (error) {
            console.error('Error creating event:', error); // Log the full error object
            res.status(500).json({ message: 'Event creation failed' });
        }
    });
}
exports.postCreateEvent = postCreateEvent;
function getAllEvents(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const events = yield (0, eventService_1.fetchAllEvents)();
            // Render the events EJS template with the fetched events
            res.render('events', { events, message: 'All events available' });
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
            // Render the event details EJS template with the fetched event
            res.render('event-details', { event });
        }
        catch (error) {
            res.status(500).json({ message: 'Failed to fetch event' });
        }
    });
}
exports.getOneEvent = getOneEvent;
function updateEvent(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const eventId = req.params.eventId;
            const updatedData = req.body;
            const updatedEvent = yield (0, eventService_1.putUpdateEvent)(eventId, updatedData);
            // Render the events EJS template with the updated event
            res.render('events', { updatedEvent, message: 'Event updated successfully' });
        }
        catch (error) {
            res.status(500).json({ message: 'Failed to update event' });
        }
    });
}
exports.updateEvent = updateEvent;
function deleteEvent(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const eventId = req.params.eventId;
            const deletedEvent = yield (0, eventService_1.deleteEventById)(eventId);
            // Redirect to the events route after deleting the event
            res.redirect('/events');
        }
        catch (error) {
            res.status(500).json({ message: 'Failed to delete event' });
        }
    });
}
exports.deleteEvent = deleteEvent;
