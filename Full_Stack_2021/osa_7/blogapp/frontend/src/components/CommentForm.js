import { useState } from 'react'

const CommentForm = ({ onComment, id }) => {
    const [comment, setComment] = useState('')

    const handleSubmit = (event) => {
        event.preventDefault()
        onComment({ id, comment })
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <input
                        value={comment}
                        onChange={({ target }) => setComment(target.value)}
                    />
                    <button type="submit">add comment</button>
                </div>
            </form>
        </div>
    )
}

export default CommentForm
