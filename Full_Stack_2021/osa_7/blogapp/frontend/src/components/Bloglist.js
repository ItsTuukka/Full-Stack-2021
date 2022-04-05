import { useRef } from 'react'
import PropTypes from 'prop-types'
import Togglable from './Togglable'
import NewBlogForm from './NewBlogForm'
import { Link } from 'react-router-dom'

const Blog = ({ blog, likeBlog, removeBlog, user }) => {
    const style = {
        padding: 3,
        margin: 5,
        borderStyle: 'solid',
        borderWidth: 1,
    }

    return (
        <div style={style} className="blog">
            <Link to={`/blogs/${blog.id}`}>
                {blog.title} {blog.author}
            </Link>
        </div>
    )
}

const Bloglist = ({ blogs, likeBlog, removeBlog, user, createBlog }) => {
    const blogFormRef = useRef()
    return (
        <div>
            <div>
                <Togglable buttonLabel="create new blog" ref={blogFormRef}>
                    <NewBlogForm onCreate={createBlog} />
                </Togglable>
            </div>
            <div id="blogs">
                {blogs.map((blog) => (
                    <Blog
                        key={blog.id}
                        blog={blog}
                        likeBlog={likeBlog}
                        removeBlog={removeBlog}
                        user={user}
                    />
                ))}
            </div>
        </div>
    )
}

Blog.propTypes = {
    blog: PropTypes.shape({
        title: PropTypes.string.isRequired,
        author: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired,
        likes: PropTypes.number.isRequired,
        user: PropTypes.shape({
            username: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
        }),
    }).isRequired,
    user: PropTypes.shape({
        username: PropTypes.string.isRequired,
    }),
    likeBlog: PropTypes.func.isRequired,
    removeBlog: PropTypes.func.isRequired,
}

export default Bloglist
