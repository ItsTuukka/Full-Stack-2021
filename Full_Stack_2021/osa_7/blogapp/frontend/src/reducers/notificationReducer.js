const notificationReducer = (state = null, action) => {
    switch (action.type) {
        case 'SET':
            return {
                message: action.data.notification,
                type: action.data.type,
            }
        case 'CLEAR':
            return null
        default:
            return state
    }
}

export const setNotification = (notification, type) => {
    return async (dispatch) => {
        dispatch({
            type: 'SET',
            data: {
                notification,
                type,
            },
        })
        setTimeout(() => {
            dispatch({
                type: 'CLEAR',
            })
        }, 5000)
    }
}

export default notificationReducer
