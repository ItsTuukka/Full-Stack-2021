import React from 'react'
import { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, user, likeBlog, deleteBlog }) => {
  const [showFull, setFull] = useState(false)
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth:1,
    marginbottom: 5
  }

  const handleChange = () => {
    setFull(!showFull)
  }

  const handleLike = () => {
    const likedBlog = { ...blog, likes: blog.likes+1 }
    likeBlog(likedBlog)
  }

  const handleDelete = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      deleteBlog(blog.id)
    }
  }

  const removeButton = () => (
    <div>
      <button id="delete-blog" onClick={handleDelete}>remove</button>
    </div>
  )

  if (showFull) {
    return (
      <div style = {blogStyle}>
        <div>
          {blog.title} {blog.author}
          <button onClick={handleChange}>
            hide
          </button>
        </div>
        <div>
          {blog.url}
        </div>
        <div>
          likes {blog.likes}
          <button id="like-button" onClick={handleLike}>
            like
          </button>
        </div>
        <div>
          {blog.user.name}
        </div>
        {user.username === blog.user.username && removeButton()}
      </div>
    )
  }

  return (
    <div style = {blogStyle}>
      <div>
        {blog.title} {blog.author}
        <button id="view-detail" onClick={handleChange}>
          view
        </button>
      </div>
    </div>
  )}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  likeBlog: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired
}

export default Blog