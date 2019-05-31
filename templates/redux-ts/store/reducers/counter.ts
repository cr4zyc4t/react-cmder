import { createReducer } from "../../utils";
import { INCREASE, DECREASE } from "../../actions/counter";

export default createReducer(0, {
  [INCREASE]: (state, action) => state + action.payload.value,
  [DECREASE]: (state, action) => state - action.payload.value,
});