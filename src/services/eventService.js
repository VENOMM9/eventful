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
exports.fetchAllEvents = exports.createEvent = void 0;
// In eventService.ts
const event_1 = __importDefault(require("../models/event"));
function createEvent(name, description, date, location) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const eventData = { name, description, date, location };
            const event = yield event_1.default.create(eventData);
            return event;
        }
        catch (error) {
            throw new Error('Error creating event');
        }
    });
}
exports.createEvent = createEvent;
function fetchAllEvents() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const events = yield event_1.default.find();
            return events;
        }
        catch (error) {
            throw new Error('Error fetching events');
        }
    });
}
exports.fetchAllEvents = fetchAllEvents;
exports.default = { createEvent, fetchAllEvents };
