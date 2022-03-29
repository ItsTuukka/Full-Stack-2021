import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
    name: 'notification',
    initialState: '',
    reducers: {
        setNotification(state, action) {
            return state = action.payload
        },
        deleteNotification(state, action) {
            return state = ''
        }
    }
})

export const makeNotification = (message, s) => {
    return async dispatch => {
        dispatch(setNotification(message))
        setTimeout(() => {
            dispatch(deleteNotification())
        }, s * 1000)
    }
}

export const { setNotification, deleteNotification } = notificationSlice.actions
export default notificationSlice.reducer