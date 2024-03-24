// In eventService.ts
import EventModel, { Event } from '../models/event';

// Create a new event
export async function createEvent(name: string, description: string, date: string, time: string, location: string): Promise<Event> {
  try {
    const eventData = { name, description, date, time, location };
    const event = await EventModel.create(eventData);
    return event;
  } catch (error) {
    throw new Error('Error creating event');
  }
}

export async function getEventById(eventId: string): Promise<Event | null> {
  try {
    const event = await EventModel.findById(eventId);
    return event;
  } catch (error) {
    throw new Error('Error fetching event by ID');
  }
}

// Fetch all events
export async function fetchAllEvents(): Promise<Event[]> {
  try {
    const events = await EventModel.find();
    console.log(events)
    return events;
  } catch (error) {
    throw new Error('Error fetching events');
  }
}

// Update an existing event
export async function putUpdateEvent(eventId: string, updatedData: Partial<Event>): Promise<Event> {
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

// Delete an event
export async function deleteEventById(eventId: string): Promise<Event> {
  try {
    const deletedEvent = await EventModel.findByIdAndDelete(eventId);
    if (!deletedEvent) {
      throw new Error('Event not found');
    }
    return deletedEvent;
  } catch (error) {
    throw new Error('Failed to delete event');
  }
}

