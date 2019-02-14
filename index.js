require('dotenv').config();
const express = require('express')
const postRouter = require('./post-Router');
const cors = require('cors')
const server = express();

server.use(express.json());
server.use(cors())
server.use('/api/posts', postRouter)

const port = process.env.PORT || 5000;
// Home Route Running
server.get('/', (req, res) => {
    res.send('Hello from EXPRESS LAB')
});

server.listen(port, () => {
    console.log(`\n*** Server Running on http://localhost:${port} ***\n`);
  });
  