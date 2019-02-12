const express = require('express')
const postRouter = require('./post-Router');
const server = express();

server.use(express.json());
server.use('/api/posts', postRouter)

// Home Route Running
server.get('/', (req, res) => {
    res.send('Hello from EXPRESS LAB')
});

  

server.listen(8000, () => console.log('API running on port 8000'));
