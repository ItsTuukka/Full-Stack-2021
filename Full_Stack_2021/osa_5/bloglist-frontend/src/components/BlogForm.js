import { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleTitleChange = (e) => {
    setTitle(e.target.value)
  }

  const handleAuthorChange = (e) => {
    setAuthor(e.target.value)
  }

  const handleUrlChange = (e) => {
    setUrl(e.target.value)
  }

  const addBlog = (e) => {
    e.preventDefault()
    createBlog({
      title: title,
      author: author,
      url: url
    })
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <form onSubmit={addBlog}>
      <div>
        title:
        <input
          id="title-input"
          value={title}
          onChange={handleTitleChange}
          placeholder='title-input'
        />
      </div>
      <div>
        author:
        <input
          id="author-input"
          value={author}
          onChange={handleAuthorChange}
          placeholder='author-input'
        />
      </div>
      <div>
        url:
        <input
          id="url-input"
          value={url}
          onChange={handleUrlChange}
          placeholder='url-input'
        />
      </div>
      <div>
        <button id="create-blog" type="submit">
          create
        </button>
      </div>
    </form>
  )
}

export default BlogForm

