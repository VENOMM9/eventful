"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const eventController_1 = require("../controllers/eventController");
const eventRouter = express_1.default.Router();
eventRouter.post('/create-event', eventController_1.postCreateEvent);
eventRouter.get('/events', eventController_1.getAllEvents);
eventRouter.get('/:eventId', eventController_1.getOneEvent); // Route to get a specific event
eventRouter.put('/:eventId', eventController_1.updateEvent); // Route to update an event
eventRouter.delete('/:eventId', eventController_1.deleteEvent); // Route to delete an event
exports.default = eventRouter;
