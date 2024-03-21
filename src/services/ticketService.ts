import TicketModel, { Ticket } from '../models/ticket';

export async function createTickets(ticketData: any): Promise<Ticket> {
  try {
    const ticket = await TicketModel.create(ticketData);
    return ticket;
  } catch (error) {
    console.error('Error creating ticket:', error);
    throw new Error('Error creating ticket');
  }
}

export async function getAllTickets(): Promise<Ticket[]> {
  try {
    const tickets = await TicketModel.find().populate('eventId').populate('userId').exec();
    return tickets;
  } catch (error) {
    throw new Error('Error fetching tickets');
  }
}

export async function updateTickets(ticketId: string, updatedData: Partial<Ticket>): Promise<Ticket> {
  try {
    const updatedTicket = await TicketModel.findByIdAndUpdate(ticketId, updatedData, { new: true });
    if (!updatedTicket) {
      throw new Error('Ticket not found');
    }
    return updatedTicket;
  } catch (error) {
    throw new Error('Failed to update ticket');
  }
}

export const getTicketById = async (ticketId: string): Promise<Ticket | null> => {
  try {
    return await TicketModel.findById(ticketId);
  } catch (error) {
    throw new Error('Error fetching ticket by ID');
  }
};

export async function deleteTickets(ticketId: string): Promise<Ticket> {
  try {
    const deletedTicket = await TicketModel.findByIdAndDelete(ticketId);
    if (!deletedTicket) {
      throw new Error('Ticket not found');
    }
    return deletedTicket;
  } catch (error) {
    throw new Error('Failed to delete ticket');
  }
}
