import express from 'express';
import { createTicketController, getDashboardController,  getTicketDetailsController, getAllTicketsController, updateTicketController, deleteTicketController } from '../controllers/ticketController';
import { validateCreateTicket } from '../middleware/middleware';
import  authenticateUser   from '../globalmiddleware/auth';


const ticketRouter = express.Router();

ticketRouter.post('/create-ticket', validateCreateTicket, createTicketController);
ticketRouter.get('/tickets', getAllTicketsController);
ticketRouter.get('/dashboard', getDashboardController);
ticketRouter.get('/:ticketId', authenticateUser, getTicketDetailsController);

ticketRouter.put('/:ticketId', updateTicketController);
ticketRouter.delete('/:ticketId', deleteTicketController);

export default ticketRouter;