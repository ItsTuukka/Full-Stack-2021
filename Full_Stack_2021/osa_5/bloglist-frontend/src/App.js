import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import './index.css'
import Togglable from './components/Toggable'
import BlogForm from './components/BlogForm'

const Notification = ({ msg }) => {
  if (msg===null) {
    return null
  }
  return (
    <div className='info'>
      {msg}
    </div>
  )
}

const Error = ({ msg }) => {
  if (msg===null) {
    return null
  }
  return (
    <div className='error'>
      {msg}
    </div>
  )
}

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsename] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [infomsg, setInfomsg] = useState(null)
  const [errormsg, setErrormsg] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs.sort((a, b) => b.likes - a.likes) )
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (e) => {
    e.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsename('')
      setPassword('')
    } catch (exception) {
      setErrormsg('wrong username or password')
      setTimeout(() => {
        setErrormsg(null)
      }, 5000)
    }
  }

  const handleLogout = (e) => {
    e.preventDefault()
    window.localStorage.removeItem('loggedUser')
    setUser(null)
    setUsename('')
    setPassword('')
  }

  const addBlog = (blogObject) => {
    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        setInfomsg(`a new blog ${returnedBlog.title} by ${returnedBlog.author} added`)
        setTimeout(() => {
          setInfomsg(null)
        }, 5000)
      })
  }

  const updateBlog = async (blogObject) => {
    const updatedBlog = await blogService.update(blogObject)
    const updatedBlogs = blogs.map(blog =>
      blog.id !== updatedBlog.id ? blog : updatedBlog)
    setBlogs(updatedBlogs.sort((a, b) => b.likes - a.likes))
  }

  const deleteBlog = async (id) => {
    const response = await blogService.remove(id)

    if (response.status === 204) {
      setBlogs(blogs.filter(blog => blog.id !==id))
      setInfomsg('blog deleted')
      setTimeout(() => {
        setInfomsg(null)
      }, 5000)
    } else {
      setErrormsg('couldn`t delete the blog')
      setTimeout(() => {
        setErrormsg(null)
      }, 5000)
    }

  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username:
        <input type="text"
          id='username'
          name="Username"
          value={username}
          onChange={({ target }) => setUsename(target.value)}
        />
      </div>
      <div>
        password
        <input type="password"
          id='password'
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button id="login-button" type="submit">login</button>
    </form>
  )

  if (user === null) {
    return (
      <div>
        <h2> Log in to application</h2>
        <Notification msg={infomsg}/>
        <Error msg={errormsg}/>
        {loginForm()}
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification msg={infomsg}/>
      <Error msg={errormsg}/>
      <p>{user.name} logged in
        <button type="button" onClick={handleLogout}>
         logout
        </button>
      </p>
      <div>
        <Togglable buttonLabel='create new blog'>
          <BlogForm createBlog={addBlog}/>
        </Togglable>
      </div>
      {blogs.map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
          user={user}
          likeBlog={updateBlog}
          deleteBlog={deleteBlog}
        />
      )}
    </div>
  )
}

export default App