import { Request, Response } from 'express';
import { createEvent, fetchAllEvents, getEventById, putUpdateEvent, deleteEventById } from '../services/eventService';
import EventModel, { Event } from '../models/event';


export async function postCreateEvent(req: Request, res: Response) {
  try {
    const { name, description, date, location } = req.body;
    const event = await createEvent(name, description, date, location);
    // Redirect to the events route after creating the event
    res.redirect('/events');
  } catch (error) {
    res.status(500).json({ message: 'Event creation failed' });
  }
}

export async function getAllEvents(req: Request, res: Response) {
  try {
    const events = await fetchAllEvents();
    // Render the events EJS template with the fetched events
    res.render('events', { events, message: 'All events available' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch events' });
  }
}

export async function getOneEvent(req: Request, res: Response) {
  try {
    const eventId = req.params.eventId;
    const event = await getEventById(eventId);
    // Render the event details EJS template with the fetched event
    res.render('event-details', { event });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch event' });
  }
}

export async function updateEvent(req: Request, res: Response) {
  try {
    const eventId = req.params.eventId;
    const updatedData = req.body;
    const updatedEvent = await putUpdateEvent(eventId, updatedData);
    // Render the events EJS template with the updated event
    res.render('events', { updatedEvent, message: 'Event updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update event' });
  }
}

export async function deleteEvent(req: Request, res: Response) {
  try {
    const eventId = req.params.eventId;
    const deletedEvent = await deleteEventById(eventId);
    // Redirect to the events route after deleting the event
    res.redirect('/events');
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete event' });
  }
}
