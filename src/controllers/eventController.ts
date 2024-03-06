import { Request, Response } from 'express';
import EventModel, { Event } from '../models/event';

// Controller for handling event-related operations

// Controller function to create a new event
const createEvent = async (req: Request, res: Response) => {
  try {
    // Extract event data from request body
    const eventData = req.body;

    // Create a new event using the Event model
    const event = await EventModel.create(eventData);

    // Send a success response with the created event data
    res.status(201).json({ event });
  } catch (error) {
    // Handle errors and send an error response
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Controller function to get all events
const getAllEvents = async (req: Request, res: Response) => {
  try {
    // Fetch all events from the database
    const events = await EventModel.find();

    // Send a success response with the fetched events
    res.status(200).json({ events });
  } catch (error) {
    // Handle errors and send an error response
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Export the controller functions
export default { createEvent, getAllEvents };
