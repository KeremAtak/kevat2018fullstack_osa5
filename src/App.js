import React from 'react'
import Blog from './components/Blog'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'
import loginService from './services/login'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      blogs: [],
      error: null,
      newBlog: '',
      title: '',
      author: '',
      url: '',
      likes: '',
      username: '',
      password: '',
      user: null
    }
  }

  componentDidMount() {
    const byLikes = (a,b) => {
      return b.likes - a.likes
    }
    blogService
      .getAll()
      .then(blogs => {
        this.setState({ blogs: blogs.sort(byLikes) })
      })

    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      this.setState({user})
      blogService.setToken(user.token)
    }
  } 

  handleFieldChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  addBlog = (event) => {
    event.preventDefault()
    const blogObject = {
      title: this.state.title,
      author: this.state.author,
      url: this.state.url,
      likes: 0
    }

    this.blogForm.toggleVisibility()

    blogService
      .create(blogObject)
      .then(newBlog => {
        this.setState({
          blogs: this.state.blogs.concat(blogObject),
          title: '',
          author: '',
          url: ''
        })
      })
  }

  login = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username: this.state.username,
        password: this.state.password
      })

      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      this.setState({ username: '', password: '', user})
    } catch (exception) {
      console.log(exception)
      this.setState({
        error: 'käyttäjätunnus tai salasana virheellinen'
      })
      setTimeout(() => {
        this.setState({ error: null})
        }, 5000)
      }
    }

    logout = (event) => {
      window.localStorage.removeItem('loggedBlogappUser')
      window.location.reload()
    } 

    toggleVisible = () => {
      this.setState({ showAll: !this.state.showAll })
    }


  render() {

    const blogStyle = {
      paddingTop: 10,
      paddingLeft: 2,
      border: 'solid',
      borderWidth: 1,
      marginBottom: 5
    }
    
    const loginForm = () => (
      <Togglable buttonLabel="login">
        <LoginForm
          visible={this.state.visible}
          username={this.state.username}
          password={this.state.password}
          handleChange={this.handleFieldChange}
          handleSubmit={this.login}
        />
      </Togglable>
    )

    const blogForm = () => (
      <Togglable buttonLabel="new blog" ref={component => this.blogForm = component}>
        <BlogForm
          onSubmit={this.addBlog}
          title={this.state.title}
          author={this.state.author}
          url={this.state.url}
          handleChange={this.handleFieldChange}
        />
      </Togglable>
    )

    return (      
      <div>
        <p>{this.state.error}</p>
        <h2>blogs</h2>
        {this.state.user === null ?
          loginForm() :
          <div>
            <p>{this.state.user.name} logged in</p>
            <button onClick = {this.logout}>logout </button>
            {blogForm()}
            {this.state.blogs.map(blog =>
              <Blog blog={blog} user = {this.state.user} />
            )}
          </div>
        }
      </div>
    )
  }
}

export default App
