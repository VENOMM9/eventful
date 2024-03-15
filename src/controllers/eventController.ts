import { Request, Response } from 'express';
import { createEvent, fetchAllEvents } from '../services/eventService';

export async function postCreateEvent(req: Request, res: Response) {
  try {
    const { title, description, date, location } = req.body;
    const event = await createEvent(title, description, date, location); // Assuming createEvent returns the newly created event
    res.render('eventCreated', { event }); // Assuming 'eventCreated' is the name of your EJS template for displaying the newly created event
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

export async function getAllEvents(req: Request, res: Response) {
  try {
    const events = await fetchAllEvents();
    res.render('events', { events }); // Assuming 'events' is the name of your EJS template for displaying all events
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

export default { postCreateEvent, getAllEvents };
