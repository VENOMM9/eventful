import express from 'express';
import { postCreateEvent, getAllEvents } from '../controllers/eventController';
import  authenticateUser   from '../globalmiddleware/auth';


const eventRouter = express.Router();

eventRouter.post('/create-event', authenticateUser,  postCreateEvent);
eventRouter.get('/allevents', getAllEvents);

export default eventRouter;
