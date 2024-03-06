// auth.routes.js
import express from 'express';
const eventRouter = express.Router();
import eventController from '../controllers/eventController';

eventRouter.post('/createEvent', eventController.createEvent);
eventRouter.post('/events', eventController.getAllEvents);


export default  eventRouter ;