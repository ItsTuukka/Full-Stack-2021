const User = ({ user }) => {
    if (!user) {
        return null
    }
    const blogs = user.blogs.map((blog) => blog)
    return (
        <div>
            <h2>{user.name}</h2>
            <div>
                <strong>added blogs</strong>
            </div>
            <ul>
                {blogs.map((blog) => (
                    <li key={blog.id}>{blog.title}</li>
                ))}
            </ul>
        </div>
    )
}

export default User
