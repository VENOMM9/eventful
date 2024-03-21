import { Request, Response } from 'express';
import { getAllTickets, createTickets, getTicketById  } from '../services/ticketService';
import mongoose from 'mongoose';
import { generateQRCode } from '../utils/QRCodeGenerator';
import path from 'path';
import TicketModel from '../models/ticket'; // Import the Ticket model
import EventModel from '../models/event'; // Import the Ticket model


export const createTicketController = async (req: Request, res: Response) => {
  try {
    const { userId, ...ticketData } = req.body;
    console.log(userId)
    console.log('Ticket Data:', ticketData); // Log ticketData here

  
    // Fetch events data from the database
    const events = await EventModel.find();

    // Create ticket
    ticketData.userId = userId;
    const createdTicket = await createTickets(ticketData);

    // Generate QR code and URL
    const qrCodeData = JSON.stringify(createdTicket);
    const qrCodeFileName = `ticket_${createdTicket._id}.png`;
    const qrCodeDirectory = path.join(__dirname, '..', 'public', 'qr_codes');
    const qrCodeFilePath = path.join(qrCodeDirectory, qrCodeFileName);
    const  qrCode = await generateQRCode(qrCodeData, qrCodeFilePath);
    const qrCodeURL = `/qr_codes/${qrCodeFileName}`;
    console.log(qrCodeFilePath)
    console.log(qrCode)
    console.log(qrCodeData)


    // Render create-ticket template with data
    res.render('ticket-details', { events, ticket: createdTicket, qrCodeURL, qrCode });
  } catch (error) {
    console.error('Error creating ticket:', error);
    res.status(500).json({ message: 'Failed to create ticket' });
  }
};

export const getTicketDetailsController = async (req: Request, res: Response) => {
  try {
    const { ticketId } = req.params;
    const ticket = await getTicketById(ticketId);

    if (!ticket) {
      return res.status(404).json({ message: 'Ticket not found' });
    }

    res.render('ticket-details', { ticket });
  } catch (error) {
    console.error('Error fetching ticket details:', error);
    res.status(500).json({ message: 'Failed to fetch ticket details' });
  }
};

export const getDashboardController = async (req: Request, res: Response) => {
  try {
    // Calculate total tickets sold and total revenue
    const tickets = await TicketModel.find();
    const totalTicketsSold = tickets.reduce((acc, ticket) => acc + ticket.quantity, 0);
    const totalRevenue = tickets.reduce((acc, ticket) => acc + ticket.price * ticket.quantity, 0);

    // Count total events
    const totalEvents = await EventModel.countDocuments();

    // Render the dashboard view with calculated statistics
    res.render('dashboard', { totalTicketsSold, totalRevenue, totalEvents });
  } catch (error) {
    console.error('Error fetching data for dashboard:', error);
    res.status(500).json({ message: 'Failed to fetch data for dashboard' });
  }
};

export const getAllTicketsController = async (req: Request, res: Response) => {
  try {
    const tickets = await getAllTickets();
    res.render('alltickets', { tickets });
  } catch (error) {
    console.error('Error fetching tickets:', error);
    res.status(500).json({ message: 'Failed to fetch tickets' });
  }
};

export const updateTicketController = async (req: Request, res: Response) => {
  try {
    const { ticketId } = req.params;
    const updatedTicket = await TicketModel.findByIdAndUpdate(ticketId, req.body, { new: true });

    if (!updatedTicket) {
      return res.status(404).json({ message: 'Ticket not found' });
    }

    res.render('update-ticket', { ticket: updatedTicket });
  } catch (error) {
    console.error('Error updating ticket:', error);
    res.status(500).json({ message: 'Failed to update ticket' });
  }
};

export const deleteTicketController = async (req: Request, res: Response) => {
  try {
    const { ticketId } = req.params;
    const deletedTicket = await TicketModel.findByIdAndDelete(ticketId);

    if (!deletedTicket) {
      return res.status(404).json({ message: 'Ticket not found' });
    }

    res.render('delete-ticket', { ticket: deletedTicket });
  } catch (error) {
    console.error('Error deleting ticket:', error);
    res.status(500).json({ message: 'Failed to delete ticket' });
  }
};
