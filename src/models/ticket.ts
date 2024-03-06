import mongoose, { Schema, Document, Types } from 'mongoose';
import { Event } from './event'
import { User } from './user'


// Define the interface for the Ticket document
export interface Ticket extends Document {
  eventId: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  // Add more fields as needed
}

// Define the schema for the Ticket model
const ticketSchema: Schema<Ticket> = new Schema({
  eventId: { type: Schema.Types.ObjectId, ref: 'Event', required: true },
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  // Add more fields as needed
});

// Create and export the Ticket model
const TicketModel = mongoose.model<Ticket>('Ticket', ticketSchema);
export default TicketModel;
