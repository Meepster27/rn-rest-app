import { combineReducers } from 'redux';

// Add feature reducers here, e.g. import movies from './movies';
// For now use an empty root reducer to avoid import errors.
const rootReducer = combineReducers({
  // movies,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
