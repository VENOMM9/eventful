// In eventService.ts
import EventModel from '../models/event';

export async function createEvent(name: string, description: string, date: string, location: string) {
  try {
    const eventData = { name, description, date, location };
    const event = await EventModel.create(eventData);
    return event;
  } catch (error) {
    throw new Error('Error creating event');
  }
}

export async function fetchAllEvents() {
  try {
    const events = await EventModel.find();
    return events;
  } catch (error) {
    throw new Error('Error fetching events');
  }
}


export default {createEvent, fetchAllEvents }