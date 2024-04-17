import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";
import loginService from "../services/login";
import userService from "../services/users";

const initialState = {
  current: null,
  all: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setCurrentUser(state, action) {
      state.current = action.payload;
    },
    clearCurrentUser(state) {
      state.current = null;
    },
    setAllUsers(state, action) {
      state.all = action.payload;
    },
    clearAllUsers(state) {
      state.all = null;
    },
  },
});

export const { setCurrentUser, clearCurrentUser, setAllUsers, clearAllUsers } =
  userSlice.actions;

export const initializeUser = () => {
  return async (dispatch) => {
    const loggedUserJSON = window.localStorage.getItem("loggedUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      blogService.setToken(user.token);
      dispatch(setCurrentUser(user));
    }
    const all = await userService.getAll();
    dispatch(setAllUsers(all));
  };
};

export const login = (credentials) => {
  return async (dispatch) => {
    try {
      const user = await loginService.login(credentials);
      window.localStorage.setItem("loggedUser", JSON.stringify(user));
      blogService.setToken(user.token);
      dispatch(setCurrentUser(user));
    } catch (error) {
      console.error("Login failed:", error);
      dispatch(setCurrentUser(null));
    }
  };
};

export const logout = () => {
  return async (dispatch) => {
    dispatch(clearCurrentUser());
    window.localStorage.removeItem("loggedUser");
    dispatch(clearAllUsers());
  };
};

export default userSlice.reducer;