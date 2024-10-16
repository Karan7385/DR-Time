require('dotenv').config();

const express = require('express');
const cors = require('cors');
const db = require('./config/db.js');
const path = require('path');

const authRoutes = require('./routes/authRoutes.js');
const homeRoutes = require('./routes/home/homeRoutes.js');

const PORT = process.env.PORT || 8000;
const MONGO_URI = process.env.MONGO_URI;

const app = express();
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(cors());
app.use(express.json());

async function startServer() {
    try {
        await db.connectionMongoDB(MONGO_URI);
        app.listen(PORT, () => {
            console.log(`Server is listening on http://localhost:${PORT}`);
        });
    } catch (error) {
        console.log('Failed to start the server:', error);
    }
}

startServer();

app.use('/api/auth', authRoutes);
app.use('/api', homeRoutes);