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
exports.getAllEvents = exports.postCreateEvent = void 0;
const eventService_1 = require("../services/eventService");
function postCreateEvent(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { title, description, date, location } = req.body;
            const event = yield (0, eventService_1.createEvent)(title, description, date, location); // Assuming createEvent returns the newly created event
            res.render('eventCreated', { event }); // Assuming 'eventCreated' is the name of your EJS template for displaying the newly created event
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    });
}
exports.postCreateEvent = postCreateEvent;
function getAllEvents(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const events = yield (0, eventService_1.fetchAllEvents)();
            res.render('events', { events }); // Assuming 'events' is the name of your EJS template for displaying all events
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    });
}
exports.getAllEvents = getAllEvents;
exports.default = { postCreateEvent, getAllEvents };
