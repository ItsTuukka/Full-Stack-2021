import { useState, useEffect, useRef } from 'react'

import Bloglist from './components/Bloglist'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Userlist from './components/Userlist'
import User from './components/User'
import BlogDetails from './components/BlogDetails'
import NavigationMenu from './components/NavigationMenu'

import blogService from './services/blogs'
import loginService from './services/login'
import userService from './services/user'

import { setNotification } from './reducers/notificationReducer'
import { useDispatch } from 'react-redux'

import { useMatch, Routes, Route, Navigate } from 'react-router-dom'

const App = () => {
    const [blogs, setBlogs] = useState([])
    const [users, setUsers] = useState([])
    const [user, setUser] = useState(null)
    const blogFormRef = useRef()
    const byLikes = (b1, b2) => (b2.likes > b1.likes ? 1 : -1)

    const dispatch = useDispatch()

    useEffect(() => {
        blogService.getAll().then((blogs) => setBlogs(blogs.sort(byLikes)))
    }, [])

    useEffect(() => {
        userService.getAll().then((users) => setUsers(users))
    }, [])

    useEffect(() => {
        const userFromStorage = userService.getUser()
        if (userFromStorage) {
            setUser(userFromStorage)
        }
    }, [])

    const login = async (username, password) => {
        loginService
            .login({
                username,
                password,
            })
            .then((user) => {
                setUser(user)
                userService.setUser(user)
                notify(`${user.name} logged in!`)
            })
            .catch(() => {
                notify('wrong username/password', 'alert')
            })
    }

    const logout = () => {
        setUser(null)
        userService.clearUser()
        notify('good bye!')
    }

    const createBlog = async (blog) => {
        blogService
            .create(blog)
            .then((createdBlog) => {
                notify(
                    `a new blog '${createdBlog.title}' by ${createdBlog.author} added`
                )
                setBlogs(blogs.concat(createdBlog))
                blogFormRef.current.toggleVisibility()
            })
            .catch((error) => {
                notify('creating a blog failed', 'alert')
            })
    }

    const removeBlog = (id) => {
        const toRemove = blogs.find((b) => b.id === id)

        const ok = window.confirm(
            `remove '${toRemove.title}' by ${toRemove.author}?`
        )

        if (!ok) {
            return
        }

        blogService.remove(id).then(() => {
            const updatedBlogs = blogs.filter((b) => b.id !== id).sort(byLikes)
            setBlogs(updatedBlogs)
        })
    }

    const likeBlog = async (id) => {
        const toLike = blogs.find((b) => b.id === id)
        const liked = {
            ...toLike,
            likes: (toLike.likes || 0) + 1,
            user: toLike.user.id,
        }

        blogService.update(liked.id, liked).then((updatedBlog) => {
            notify(`you liked '${updatedBlog.title}' by ${updatedBlog.author}`)
            const updatedBlogs = blogs
                .map((b) => (b.id === id ? updatedBlog : b))
                .sort(byLikes)
            setBlogs(updatedBlogs)
        })
    }

    const addComment = async ({ id, comment }) => {
        const toComment = blogs.find((b) => b.id === id)
        const commented = {
            ...toComment,
            user: toComment.user.id,
            comments: toComment.comments.concat(comment),
        }

        blogService.update(commented.id, commented).then((updatedBlog) => {
            notify(
                `you commented '${updatedBlog.title}' by ${updatedBlog.author}`
            )
            const updatedBlogs = blogs.map((b) =>
                b.id === id ? updatedBlog : b
            )
            setBlogs(updatedBlogs)
        })
    }

    const notify = (message, type = 'info') => {
        dispatch(setNotification(message, type))
    }

    const usermatch = useMatch('/users/:id')
    const userById = usermatch
        ? users.find((user) => user.id === usermatch.params.id)
        : null

    const blogmatch = useMatch('/blogs/:id')
    const blogById = blogmatch
        ? blogs.find((blog) => blog.id === blogmatch.params.id)
        : null

    if (user === null) {
        return (
            <div className="container">
                <Notification />
                <LoginForm onLogin={login} />
            </div>
        )
    }

    return (
        <div className="container">
            <div>
                <NavigationMenu user={user} logout={logout} />
            </div>
            <h2>blog app</h2>
            <Notification />
            <Routes>
                <Route
                    path="/blogs/:id"
                    element={
                        blogById ? (
                            <BlogDetails
                                blog={blogById}
                                likeBlog={likeBlog}
                                removeBlog={removeBlog}
                                addComment={addComment}
                                user={user}
                            />
                        ) : (
                            <Navigate replace to="/" />
                        )
                    }
                />
                <Route path="/users/:id" element={<User user={userById} />} />
                <Route path="/users" element={<Userlist users={users} />} />
                <Route
                    path="/"
                    element={
                        <Bloglist
                            blogs={blogs}
                            likeBlog={likeBlog}
                            removeBlog={removeBlog}
                            user={user}
                            createBlog={createBlog}
                        />
                    }
                />
            </Routes>
        </div>
    )
}

export default App
