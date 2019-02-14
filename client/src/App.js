import React, { Component } from 'react';
import axios from 'axios'
import {Card} from 'semantic-ui-react'
import './App.css';
import Post from './Post'

class App extends Component {
  constructor(props){
    super(props);
    this.state={
      posts: [],
      isUpdating: false,
    }
  }
  deletePost = (e, post) =>{
    e.preventDefault()
    const id = post.id
    axios.delete(`http://localhost:8000/api/posts/${id}`)
    .then(res => console.log(res))
    .then(this.getPosts)
    .catch(err => console.log(err))
  }
  componentDidMount(){
    this.getPosts()
  }
  getPosts = () =>{
    axios
    .get('http://localhost:8000/api/posts')
    .then(res => this.setState({posts: res.data.posts}))
    .catch(res => console.log(res));
  }
  editPosts = (e, post) =>{
    console.log(post)
    e.preventDefault()
    const id = post.id
    console.log(id)
    axios.put(`http://localhost:8000/api/posts/${id}`, post)
    .then(res => {
      console.log(res.data.post[0].id)
      const updatedPosts = this.state.posts.filter(post => post.id !== res.data.post[0].id);
      console.log(updatedPosts)
      this.setState({posts: [
        ...updatedPosts,
        res.data.post[0]
      ]})
    })
    .catch(err => console.log(err));
  }
  render() {
    return (
      <div className="App">
        <Card.Group>
        {this.state.posts.map(post =>{
          return <Post 
          key={post.id}
          post={post}
          editPosts={this.editPosts}
          deletePost={this.deletePost}/>
        })}
        </Card.Group>
      </div>
    );
  }
}

export default App;
