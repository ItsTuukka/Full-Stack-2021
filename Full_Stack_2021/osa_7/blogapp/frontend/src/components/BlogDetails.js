import CommentForm from './CommentForm'

const BlogDetails = ({ blog, likeBlog, removeBlog, addComment, user }) => {
    const own = blog.user && user.username === blog.user.username

    const addedBy = blog.user && blog.user.name ? blog.user.name : 'anonymous'

    return (
        <div>
            <h2>
                {blog.title} {blog.author}
            </h2>
            <div>
                <a href={blog.url}>{blog.url}</a>
            </div>
            <div>
                {blog.likes} likes{' '}
                <button onClick={() => likeBlog(blog.id)}>like</button>
            </div>
            added by {addedBy}
            {own && <button onClick={() => removeBlog(blog.id)}>remove</button>}
            <h3>comments</h3>
            <CommentForm onComment={addComment} id={blog.id} />
            <ul>
                {blog.comments.map((comment) => (
                    <li key={comment}>{comment}</li>
                ))}
            </ul>
        </div>
    )
}

export default BlogDetails
