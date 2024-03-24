import express, { Application, Request, Response, NextFunction } from 'express';
import logger from './logger/logger'; // Assuming logger folder is in the same directory
import bodyParser from 'body-parser';
import { connectionToMongodb } from "./utils/db";
import authRoute from './routes/authRouter';
import eventRoute from './routes/eventRouter';
import ticketRoute from './routes/ticketRouter';
import cookieParser from 'cookie-parser';
import { getTicketDetailsController, getDashboardController } from './controllers/ticketController'; // Importing the ticketController
import TicketModel from './models/ticket';
import  EventModel  from './models/event'; // Import the EventModel


// import cacheMiddleware from './utils/cache'; // Assuming you've saved the middleware in a file named 'cacheMiddleware.ts'


import path from 'path';
import dotenv from 'dotenv';
dotenv.config();

const app: Application = express();
app.use(cookieParser());
// app.use(cacheMiddleware);



// Set up EJS for rendering viewsg
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Parse incoming request bodies
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Routes
app.use('/user', authRoute);
app.use('/event', eventRoute);
app.use('/ticket', ticketRoute);

// Connect to MongoDB
connectionToMongodb();


app.get('/', (req: Request, res: Response) => {
  res.render('home'); 
});
// Routes for rendering views
app.get('/create-ticket', async (req: Request, res: Response) => {
  try {
    // Call the createTicket function from the ticketController to create a new ticket
    const ticket = await TicketModel.find()
    const events = await EventModel.find()


    // Render the 'create-ticket' view and pass the ticket object
    res.render('create-ticket', { ticket: ticket, events: events  });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});
app.get('/tickets', async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Fetch tickets data from MongoDB using your TicketModel
    const tickets = await TicketModel.find();
    console.log(tickets)

    // Render the tickets page and pass the tickets data to the template
    res.render('tickets', { tickets: tickets });
  } catch (error) {
    // Handle errors
    console.error('Error fetching tickets:', error);
    res.status(500).json({ message: 'Failed to fetch tickets' });
  }
});
app.get('/update-ticket', (req: Request, res: Response) => {
  res.render('update-ticket'); // Render the 'createevent.ejs' view
});

app.get('/delete-ticket', (req: Request, res: Response) => {
  res.render('delete-ticket'); // Render the 'createevent.ejs' view
});

app.get('/create-event', (req: Request, res: Response) => {
  res.render('create-event'); // Render the 'createevent.ejs' view
});
app.get('/unknownevent', (req: Request, res: Response) => {
  res.render('unknownevent'); // Render the 'createevent.ejs' view
});

app.get('/existingticket', (req: Request, res: Response) => {
  res.render('existingticket'); // Render the 'createevent.ejs' view
});



app.get('/events', async (req: Request, res: Response) => {
  try {
    // Fetch events from the database
    const events = await EventModel.find();

    // Render the events page and pass the events data to the template
    res.render('events', { events: events });
  } catch (error) {
    // Handle errors
    console.error('Error fetching events:', error);
    res.status(500).json({ message: 'Failed to fetch events' });
  }
});


app.get('/dashboard', getDashboardController);
app.get('/ticket-details', getTicketDetailsController);


// Other routes for rendering views
app.get('/signup', (req: Request, res: Response) => {
  res.render('signup');
});

app.get('/login', (req: Request, res: Response) => {
  res.render('login');
});

app.get('/existinguser', (req: Request, res: Response) => {
  res.render('existinguser');
});

app.get('/invalidinfo', (req: Request, res: Response) => {
  res.render('invalidinfo');
});

app.get('/unknown', (req: Request, res: Response) => {
  res.render('unknown');
});

// Route for logging out
app.get('/logout', (req: Request, res: Response) => {
  res.clearCookie('token');
  res.redirect('/login');
});

// Error handling middleware
// Error handling middleware
  app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  
    logger.error(`Error occurred: ${err.stack}`);
    res.status(500).send('Something broke!');
});

// Start server
const PORT: number = process.env.PORT ? parseInt(process.env.PORT, 10) : 5100;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
