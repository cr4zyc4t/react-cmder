import { createReducer } from "../../utils";
import { INCREASE, DECREASE } from "../../actions/counter";

function handleIncrease(state, action) {
  return state + action.payload.value;
}

function handleDecrease(state, action) {
  return state - action.payload.value;
}

const intialState = 0;
export default createReducer(intialState, {
  [INCREASE]: handleIncrease,
  [DECREASE]: handleDecrease,
});