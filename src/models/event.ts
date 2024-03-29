import mongoose, { Schema, Document } from 'mongoose';

// Define the interface for the Event document
export interface Event extends Document {
  name: string;
  description: string;
  date: Date;
  time: string; // Add the time field
  location: string;
}

// Define the schema for the Event model
const eventSchema: Schema<Event> = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, required: true },
  time: { type: String }, // Add the time field
  location: { type: String, required: true }
});

// Create and export the Event model
const EventModel = mongoose.model<Event>('Event', eventSchema);
export default EventModel;