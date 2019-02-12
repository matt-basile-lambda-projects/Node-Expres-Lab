const express = require('express')
const db = require('./data/db')

const server = express();
server.use(express.json());
// Home Route Running
server.get('/', (req, res) => {
    res.send('Hello from EXPRESS LAB')
});
// Get All Posts
server.get('/api/posts', (req, res) => {
    db
    .find()
    .then(posts => {
        if(posts){
        res.status(200).json({success: true, posts})
      } else{
        res.status(500).json({success:false, message: 'The posts information could not be retrieved.'});
      }})
      .catch(({code, message}) =>{
        res.status(code).json({success: false, message})
    })
});
//Get Single Post
server.get('/api/posts/:id', (req, res) => {
    const {id} = req.params;
    db
    .findById(id)
    .then(posts => { 
        if(posts){
        res.status(200).json({success: true, posts})
      } else{
        res.status(404).json({success:false, message: 'The post with that ID does not exist.'});
      }})
      .catch(({}) =>{
        res.status(500).json({success:false, message: 'The posts information could not be retrieved.'});
    })
});
// Delete Single Post
server.delete('/api/posts/:id', (req, res) => {
    const {id} = req.params;
    db
    .remove(id)
    .then(posts => { 
        if(posts){
        res.status(204).end();
      } else{
        res.status(404).json({success:false, message: 'The post with that ID does not exist.'});
      }})
      .catch(({}) =>{
        res.status(500).json({success:false, message: 'The posts information could not be retrieved.'});
    })
});

// Add Posts
server.post('/api/posts', (req, res) => {
    const { title, contents } = req.body;
    const newPost = { title, contents };
    if (!title || !contents) {
      return res
        .status(400)
        .json({ errorMessage: "Please provide title and contents for the post." });
    }
    db.insert(newPost)
      .then(postID => {
        const { id } = postID;
        db.findById(id).then(post => {
          console.log(post);
          if (!post) {
            return res
              .status(404)
              .send({ Error: `A post does not exist by that id ${id}` });
          }
          res.status(201).json(post);
        });
      })
      .catch(() => res.status(500).json({success: false, message: "There was an error while saving the post to the database."})
  )});









server.listen(8000, () => console.log('API running on port 8000'));
