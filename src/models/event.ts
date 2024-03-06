import mongoose, { Schema, Document } from 'mongoose';

// Define the interface for the Event document
export interface Event extends Document {
  title: string;
  description: string;
  date: Date;
  // Add more fields as needed
}

// Define the schema for the Event model
const eventSchema: Schema<Event> = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, required: true },
  // Add more fields as needed
});

// Create and export the Event model
const EventModel = mongoose.model<Event>('Event', eventSchema);
export default EventModel;
