import { combineReducers, configureStore } from '@reduxjs/toolkit';
import usersReducer, { fetchData } from './reducers/usersSlice';

const reducer = combineReducers({
  users: usersReducer,
});

const store = configureStore({
  reducer,
});
store.dispatch(fetchData());

export default store;
