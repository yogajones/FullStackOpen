import { createSlice } from '@reduxjs/toolkit'

export const initialState = ''

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        setNotification(state, action) {
            return action.payload
        },
        clearNotification(state, action) {
            return initialState
        }
    }
})

export const { setNotification, clearNotification } = notificationSlice.actions

export const notifyUser = (message, timeoutSeconds) => {
    return async dispatch => {
        dispatch(setNotification(message))
        setTimeout((() => { (dispatch(clearNotification())) }), timeoutSeconds * 1000)
    }
}

export default notificationSlice.reducer