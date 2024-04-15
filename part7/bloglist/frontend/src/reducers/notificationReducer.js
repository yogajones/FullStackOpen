import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  message: "",
  type: "success",
};

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    setNotification(state, action) {
      return action.payload;
    },
    clearNotification(state, action) {
      return initialState;
    },
  },
});

export const { setNotification, clearNotification } = notificationSlice.actions;

export const notify = (message, type = "success", timeoutSeconds = 5) => {
  return async (dispatch) => {
    dispatch(setNotification({ message, type }));
    setTimeout(() => {
      dispatch(clearNotification());
    }, timeoutSeconds * 1000);
  };
};

export default notificationSlice.reducer;
