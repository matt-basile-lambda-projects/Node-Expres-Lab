
import {Card, Button, Icon, Input} from 'semantic-ui-react'
import React, { Component } from 'react'


export default class Post extends Component {
    constructor(props){
        super(props);
        this.state={
            isEditing: false,
            updatedPost:{
                ...this.props.post,
                title: this.props.post.title,
                contents: this.props.post.contents
            }
        }
    }
 editingPost = e =>{
     e.preventDefault()
     this.setState({isEditing: true})
 }
submitEditedPost = e =>{
     e.preventDefault()
    this.setState({isEditing: false})
    this.props.editPosts(e, this.state.updatedPost)
 }
 handleChanges = e =>{
      this.setState({
        updatedPost:({
          ...this.state.updatedPost,
          [e.target.name]: e.target.value
        })      
        
    })
  }

  render() {
    return (
        <Card>
        <Card.Content>
            {this.state.isEditing ? 
            <Input onChange={e => this.handleChanges(e)}  name="title" type="text"value={this.state.updatedPost.title} />
            :<Card.Header>{this.props.post.title}</Card.Header>}
        <Card.Content>
        {this.state.isEditing ? 
            <Input onChange={e => this.handleChanges(e)}  name="contents" type="text" value={this.state.updatedPost.contents} />
            :<Card.Meta>{this.props.post.contents}</Card.Meta>
        }
            
            </Card.Content>
          </Card.Content>
        <Card.Meta>{this.props.post.contents}</Card.Meta>
        {this.state.isEditing ? 
            <Button onClick={e=>this.submitEditedPost(e)} animated positive>
            <Button.Content visible>Submit</Button.Content>
            <Button.Content hidden>
              <Icon name='check circle outline' />
            </Button.Content>
          </Button>
            :
        <Button onClick={e=>this.editingPost(e)} animated positive>
          <Button.Content visible>Edit</Button.Content>
          <Button.Content hidden>
            <Icon name='edit outline' />
          </Button.Content>
        </Button>}

        <Button onClick={(e,data) => this.props.deletePost(e, this.props.post)} animated negative>
          <Button.Content visible>Delete</Button.Content>
          <Button.Content hidden>
            <Icon name='trash alternate outline' />
          </Button.Content>
        </Button>
        
        </Card>
    )
  }
}
