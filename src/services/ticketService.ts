import TicketModel, { Ticket } from '../models/ticket';

const createTicket = async (ticketData: any): Promise<Ticket> => {
  try {
    const ticket = await TicketModel.create(ticketData);
    return ticket;
  } catch (error) {
    console.error('Error creating ticket:', error);
    throw new Error('Error creating ticket');
  }
};

const getAllTickets = async (): Promise<Ticket[]> => {
  try {
    // Find all tickets
    const tickets = await TicketModel.find()
      .populate('eventId')
      .populate('userId')
      .exec(); // Execute the query

    return tickets;
  } catch (error) {
    throw new Error('Error fetching tickets');
  }
};

export default { createTicket, getAllTickets };
