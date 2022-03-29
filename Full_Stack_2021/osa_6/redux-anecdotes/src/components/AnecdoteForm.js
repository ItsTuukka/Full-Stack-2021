import { connect } from "react-redux"
import { createAnecdote } from '../reducers/anecdoteReducer'
import { makeNotification } from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {

  const addAnecdote = async (e) => {
    e.preventDefault()
    const content = e.target.content.value
    e.target.content.value = ""
    props.createAnecdote(content)
    props.makeNotification(`added a new anecdote, "${content}"`, 5)
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={addAnecdote}>
        <input name="content" />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

const mapDispatchToProps = {
  createAnecdote,
  makeNotification
}

const ConnectedAnecdoteForm = connect(
  null,
  mapDispatchToProps
)(AnecdoteForm)

export default ConnectedAnecdoteForm