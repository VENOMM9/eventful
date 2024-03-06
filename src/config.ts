import dotenv from "dotenv";

dotenv.config();

const config = {
    MONGODB_URL: process.env.MONGODB_URL || 'mongodb://localhost:27017/test',
    // Add other configuration options here
};

export default config;
