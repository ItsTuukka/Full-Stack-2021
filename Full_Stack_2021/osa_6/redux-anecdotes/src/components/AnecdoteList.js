import { useSelector, useDispatch } from 'react-redux'
import { voteFor } from '../reducers/anecdoteReducer'
import { makeNotification } from '../reducers/notificationReducer'

const Anecdote = ({ anecdote, handleClick }) => {
    return(
      <div>
        <div>
          {anecdote.content}
        </div>
        <div>
          has {anecdote.votes}
          <button onClick={handleClick}>vote</button>
        </div>
      </div>
    )
}

const AnecdoteList = () => {
    const dispatch = useDispatch()
    const getAnecdotes = useSelector(state => state.anecdotes)
    const filter = useSelector(state => state.filter)
    const anecdotes = [...getAnecdotes]

    const vote = (id, content) => {
      dispatch(voteFor(id))
      dispatch(makeNotification(`you voted "${content}"`, 5))
    }
    
    return(
      <div>
        {anecdotes
        .filter(anecdote =>
          anecdote.content.includes(filter))
        .sort((a, b)=> b.votes - a.votes)
        .map(anecdote =>
          <Anecdote
            key={anecdote.id}
            anecdote={anecdote}
            handleClick={() =>
              vote(anecdote.id, anecdote.content)
            }
          />
        )}
      </div>
    )
}

export default AnecdoteList