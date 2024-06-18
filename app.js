const express = require('express');
const cors = require('cors');
const { db } = require('./db/db');
const { readdirSync } = require('fs');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT;

// Middlewares
app.use(express.json());
app.use(cors());

// Routes
readdirSync('./routes').map((file) => {
    if (file.endsWith('.js') || file.endsWith('.jsx')) {
        const route = require(`./routes/${file}`);
        app.use('/api/v1', route);
    }
});

const server = () => {
    db();
    app.listen(PORT, () => {
        console.log('Listening to port:', PORT);
    });
};

server();
