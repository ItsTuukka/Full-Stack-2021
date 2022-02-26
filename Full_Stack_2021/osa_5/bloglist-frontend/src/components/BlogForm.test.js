import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

test('BlogForm calls prop with right values', () => {
  const createBlog = jest.fn()

  render(<BlogForm createBlog={createBlog}/>)

  const titleInput = screen.getByPlaceholderText('title-input')
  const authorInput = screen.getByPlaceholderText('author-input')
  const urlInput = screen.getByPlaceholderText('url-input')
  const button = screen.getByText('create')

  userEvent.type(titleInput, 'reactin testaus')
  userEvent.type(authorInput, 'Aurinkokuningas')
  userEvent.type(urlInput, 'eiookivaa.com')
  userEvent.click(button)

  expect(createBlog.mock.calls[0][0].title).toBe('reactin testaus')
  expect(createBlog.mock.calls[0][0].author).toBe('Aurinkokuningas')
  expect(createBlog.mock.calls[0][0].url).toBe('eiookivaa.com')
})