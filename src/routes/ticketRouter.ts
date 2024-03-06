// auth.routes.js
import express from 'express';
const ticketRouter = express.Router();
import ticketController from '../controllers/ticketController';

ticketRouter.post('/createEvent', ticketController.createTicket);
ticketRouter.post('/events', ticketController.getAllTickets);


export default ticketRouter ;