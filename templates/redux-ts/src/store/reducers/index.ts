import { combineReducers } from "redux";

import counter from "./counter";

const rootReducer = combineReducers({
  counter,
});

export type AppState = ReturnType<typeof rootReducer>

export default rootReducer;