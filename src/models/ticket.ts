import mongoose, { Schema, Document } from 'mongoose';

// Define enum for ticket types
enum TicketType {
  VIP = 'VIP',
  Regular = 'Regular',
  Premium = 'Premium',
  // Add more ticket types as needed
}

export interface Ticket extends Document {
  eventId: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  ticketType: TicketType; // Define ticket type as enum
  // Add other fields as needed
}

const ticketSchema: Schema<Ticket> = new Schema({
  eventId: { type: Schema.Types.ObjectId, ref: 'Event' },
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
  ticketType: { type: String, enum: Object.values(TicketType)}, // Define ticket type as enum
  // Add other fields as needed
});

const TicketModel = mongoose.model<Ticket>('Ticket', ticketSchema);

export default TicketModel;
