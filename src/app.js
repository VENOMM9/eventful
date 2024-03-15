"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const logger_1 = __importDefault(require("./logger/logger")); // Assuming logger folder is in the same directory
const body_parser_1 = __importDefault(require("body-parser"));
const db_1 = require("./utils/db");
const authRouter_1 = __importDefault(require("./routes/authRouter"));
const eventRouter_1 = __importDefault(require("./routes/eventRouter"));
const ticketRouter_1 = __importDefault(require("./routes/ticketRouter"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const event_1 = __importDefault(require("./models/event"));
// import cacheMiddleware from './utils/cache'; // Assuming you've saved the middleware in a file named 'cacheMiddleware.ts'
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cookie_parser_1.default)());
// app.use(cacheMiddleware);
// Set up EJS for rendering viewsg
app.set('view engine', 'ejs');
app.set('views', path_1.default.join(__dirname, 'views'));
// Serve static files
app.use(express_1.default.static(path_1.default.join(__dirname, 'public')));
app.use('/uploads', express_1.default.static(path_1.default.join(__dirname, 'uploads')));
app.use('/qr-codes', express_1.default.static(path_1.default.join(__dirname, 'utils', 'qr_codes')));
// Parse incoming request bodies
app.use(express_1.default.urlencoded({ extended: false }));
app.use(body_parser_1.default.json());
// Routes
app.use('/user', authRouter_1.default);
app.use('/event', eventRouter_1.default);
app.use('/ticket', ticketRouter_1.default);
// Connect to MongoDB
(0, db_1.connectionToMongodb)();
app.get('/', (req, res) => {
    res.render('home');
});
// Routes for rendering views
app.get('/create-ticket', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Call the createTicket function from the ticketController to create a new ticket
        // const ticket = await ticketController.createTicket(req, res);
        // Render the 'create-ticket' view and pass the ticket object
        res.render('create-ticket', { events: null, ticket: null });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}));
app.get('/create-event', (req, res) => {
    res.render('create-event'); // Render the 'createevent.ejs' view
});
app.get('/allevents', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Retrieve events from the database
        const events = yield event_1.default.find(); // Assuming you're using Mongoose
        // Render the 'allevents' view and pass the events variable
        res.render('allevents', { events: events });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}));
// Other routes for rendering views
app.get('/signup', (req, res) => {
    res.render('signup');
});
app.get('/login', (req, res) => {
    res.render('login');
});
app.get('/existinguser', (req, res) => {
    res.render('existinguser');
});
app.get('/invalidinfo', (req, res) => {
    res.render('invalidinfo');
});
app.get('/unknown', (req, res) => {
    res.render('unknown');
});
// Route for logging out
app.get('/logout', (req, res) => {
    res.clearCookie('token');
    res.redirect('/login');
});
// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    logger_1.default.error(err.stack); // Log the error using the logger
    res.status(500).send('Something broke!');
});
// Start server
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 5100;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
exports.default = app;
