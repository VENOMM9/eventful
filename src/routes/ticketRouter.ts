import express from 'express';
import ticketController from '../controllers/ticketController';
import authenticateUser from '../globalmiddleware/auth';
import { validateCreateTicket } from '../middleware/middleware';

const ticketRouter = express.Router();

ticketRouter.post('/create-ticket',  ticketController.createTicket);
ticketRouter.get('/tickets', ticketController.getAllTickets);

export default ticketRouter;