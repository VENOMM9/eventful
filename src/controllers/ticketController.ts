import { Request, Response } from 'express';
import TicketModel, { Ticket } from '../models/ticket';

// Controller for handling ticket-related operations

// Controller function to create a new ticket
const createTicket = async (req: Request, res: Response) => {
  try {
    // Extract ticket data from request body
    const ticketData = req.body;

    // Create a new ticket using the Ticket model
    const ticket = await TicketModel.create(ticketData);

    // Send a success response with the created ticket data
    res.status(201).json({ ticket });
  } catch (error) {
    // Handle errors and send an error response
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Controller function to get all tickets
const getAllTickets = async (req: Request, res: Response) => {
  try {
    // Fetch all tickets from the database
    const tickets = await TicketModel.find();

    // Send a success response with the fetched tickets
    res.status(200).json({ tickets });
  } catch (error) {
    // Handle errors and send an error response
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Export the controller functions
export default { createTicket, getAllTickets };
