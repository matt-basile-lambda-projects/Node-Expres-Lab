const express = require('express');
const db = require('./data/db')
const router = express.Router()

// Get All Posts
router.get('/', (req, res) => {
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
router.get('/:id', (req, res) => {
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
// Add Posts
router.post('/', (req, res) => {
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

// Delete Single Post
router.delete('/:id', (req, res) => {
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
// Edit a USER
router.put("/:id", (req, res) => {
    const { id } = req.params;
    const { title, contents } = req.body;
    const post = { title, contents };
    console.log(post) //{ title: 'Exzc', contents: 'ent at Lambda School' }
    if (!title || !contents) {
        return res.status(400).json({success: false, message: "Must provide title and contents"});
  }
    db.update(id, post)
      .then(response => {
        if(response == 0) {
            return res.status(404).json({success: false, message: "Post with ID does not exist"});
        }
        db.findById(id)
          .then(post=> {
              console.log(post)
              if(post.length === 0) {
                return res.status(404).json({success: false, message: "Post with ID does not exist"});
              }
              res.json({ post });
          })
  
      })
      .catch(message => {
        return res.status(400).json({success: false, message: message});
      });
  });

  module.exports = router;