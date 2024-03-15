import { Request, Response } from 'express';
import ticketService from '../services/ticketService';
import { generateQRCode } from '../utils/QRCodeGenerator';
import path from 'path';
import eventService from '../services/eventService';
import userService from '../services/authService'; // Import the userService

const createTicket = async (req: Request, res: Response) => {
  try {
    // Fetch event and user data from the database
    const events = await eventService.fetchAllEvents();
    const users = await userService.getAllUsers();

    // Generate a QR code for the ticket
    const ticketData = {
      eventId: req.body.eventId,
      userId: req.body.userId,
      ticketType: req.body.ticketType,
      price: req.body.price,
      quantity: req.body.quantity,
    };

    // Generate a unique filename for the QR code
    const fileName = `ticket_${Date.now()}.png`;

    // Generate the QR code and save it to a file
    await generateQRCode(JSON.stringify(ticketData), fileName);

    // Get the URL for the QR code
    const qrCodeUrl = `/utils/qr_codes/${fileName}`;

    // Create the ticket in the database
    const ticket = await ticketService.createTicket(ticketData);

    // Pass event, user, and ticket data to the view for rendering the form
    return res.render('create-ticket', { events, users, ticket, qrCodeUrl });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to create ticket' });
  }
};

const getAllTickets = async (req: Request, res: Response) => {
  try {
    const tickets = await ticketService.getAllTickets();
    res.status(200).json({ tickets });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch tickets' });
  }
};

export default { createTicket, getAllTickets };
