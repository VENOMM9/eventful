import { Request, Response } from 'express';
import { createEvent, fetchAllEvents, getEventById, putUpdateEvent, deleteEventById } from '../services/eventService';
import EventModel, { Event } from '../models/event';


export async function postCreateEvent(req: Request, res: Response) {
  try {
    const { name, description, date, location } = req.body;
    const event = await createEvent(name, description, date, location);
    res.status(201).json({ event, message: 'Event created successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Event creation failed' });
  }
}

export async function getAllEvents(req: Request, res: Response) {
  try {
    const events = await fetchAllEvents();
    res.status(200).json({ events, message: 'All events available' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch events' });
  }
}

export async function getOneEvent(req: Request, res: Response) {
  try {
    const eventId = req.params.eventId;
    const event = await getEventById(eventId);
    res.status(200).json({ event });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch event' });
  }
}

// Update an existing event
export async function UpdateEvent(eventId: string, updatedData: Partial<Event>): Promise<Event> {
  try {
    const updatedEvent = await EventModel.findByIdAndUpdate(eventId, updatedData, { new: true });
    if (!updatedEvent) {
      throw new Error('Event not found');
    }
    return updatedEvent;
  } catch (error) {
    throw new Error('Failed to update event');
  }
}

export async function deleteEvent(req: Request, res: Response) {
  try {
    const eventId = req.params.eventId;
    const deletedEvent = await deleteEventById(eventId);
    res.status(200).json({ deletedEvent, message: 'Event deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete event' });
  }
}
