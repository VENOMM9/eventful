import express from 'express';
import { postCreateEvent, getAllEvents, getOneEvent, updateEvent, deleteEvent } from '../controllers/eventController';
import { validateCreateEvent } from '../middleware/middleware';

const eventRouter = express.Router();

eventRouter.post('/create-event', validateCreateEvent, postCreateEvent);
eventRouter.get('/events', getAllEvents);
eventRouter.get('/:eventId', getOneEvent); // Route to get a specific event
eventRouter.put('/:eventId', updateEvent); // Route to update an event
eventRouter.delete('/:eventId', deleteEvent); // Route to delete an event

export default eventRouter;
