import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

test ('renders title and author', () => {
  const blog = {
    title: 'reactin testaus',
    author: 'Jussi',
    url: 'motiloppu.com',
    likes: 2
  }

  render(<Blog blog ={blog} />)

  const title = screen.getByText('reactin testaus', { exact: false })
  const author = screen.getByText('Jussi', { exact: false })
  const url = screen.queryByText('motiloppu.com')
  const likes = screen.queryByText('likes')

  expect(title).toBeDefined()
  expect(author).toBeDefined()
  expect(url).toBeNull()
  expect(likes).toBeNull()
})

test ('view button works', async () => {
  const blog = {
    title: 'reactin testaus',
    author: 'Jussi',
    url: 'motiloppu.com',
    likes: 2,
    user: {
      name: 'seppo',
      username: 'tester'
    }
  }

  const user = {
    username: 'tester'
  }

  const mockHandler = jest.fn()

  render(<Blog blog ={blog} user={user} handleleChange={mockHandler}/>)

  const button = screen.getByText('view')
  userEvent.click(button)

  const url = screen.getByText('motiloppu.com', { exact: false })
  const likes = screen.getByText('likes', { exact: false })

  expect(url).toBeDefined()
  expect(likes).toBeDefined()
})

test ('view button works', async () => {
  const blog = {
    title: 'reactin testaus',
    author: 'Jussi',
    url: 'motiloppu.com',
    likes: 2,
    user: {
      name: 'seppo',
      sername: 'tester'
    }
  }

  const user = {
    username: 'tester'
  }

  const mockHandler = jest.fn()
  const handleLike = jest.fn()
  const likeHandler = jest.fn()

  render(<Blog blog ={blog}
    user={user}
    likeBlog={likeHandler}
    handleleChange={mockHandler}
    handleLike={handleLike}/>)

  const button = screen.getByText('view')
  userEvent.click(button)

  const likeButton = screen.getByText('like')
  userEvent.click(likeButton)
  userEvent.click(likeButton)

  expect(likeHandler.mock.calls).toHaveLength(2)
})