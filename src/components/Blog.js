import React from 'react'
import Togglable from '../components/Togglable'
import blogService from '../services/blogs'
import App from '../App'

class Blog extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      blog: props.blog,
      user: props.user,
      app: props.app,
      user_id: props.user === null ? null : props.user.id
    }
  }

  like = async(event) => {
    
    event.preventDefault()
    try {
      const blog = await blogService.update(this.state.blog.id,{
        title: this.state.blog.title,
        author: this.state.blog.author,
        url: this.state.blog.url,
        likes: this.state.blog.likes + 1,
        user: this.state.blog.user
      })
    } catch (exception) {
      this.setState({
        error: 'blogia ei voitu tykätä'
      })
    setTimeout(() => {
      this.setState({ error: null})
      }, 5000)
    }
    
  }

  delete = async(event) => {
    if (window.confirm(`delete '${this.state.blog.title}' by ${this.state.blog.author} ?`)) {
      event.preventDefault()
      try {
        await blogService.deleteBlog(this.state.blog.id)
      } catch (exception) {
        this.setState({
          error: 'blogia ei voitu poistaa'
        })
      setTimeout(() => {
        this.setState({ error: null})
        }, 5000)
      }
    }
  }
  
  render() {

    const blogStyle = {
      paddingTop: 10,
      paddingLeft: 2,
      border: 'solid',
      borderWidth: 1,
      marginBottom: 5
    }

    const BlogTitle = () => (
      <div style={blogStyle} className="content">
        {this.state.blog.title} {this.state.blog.author}
      </div> 
    )
  
    return (
      <div>
        {BlogTitle()}
        <Togglable buttonLabel="view" style = {this.blogStyle}>
          <div style={blogStyle} className="viewable">
            <p>{this.state.blog.url} </p>
            <p>{this.state.blog.likes} likes <button onClick = {this.like}>like</button></p>
            <p>added by {this.state.user.name} </p>
            <p><button onClick = {this.delete} hidden={this.state.user_id !== this.state.blog.user.id || this.state.user_id === null}>delete</button></p>
          </div>  
        </Togglable>
      </div>
    )
  }
}

export default Blog