const express = require('express')
const db = require('./data/db')

const server = express();

server.get('/', (req, res) => {
    res.send('Hello from EXPRESS LAB')
});

server.listen(8000, () => console.log('API running on port 8000'));
