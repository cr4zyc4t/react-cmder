import { createReducer } from "../../utils";
import { INCREASE, DECREASE, IncreaseAction, DecreaseAction } from "../../actions/counter";

function handleIncrease(state: number, action: IncreaseAction) {
  return state + action.payload.value;
}

function handleDecrease(state: number, action: DecreaseAction) {
  return state - action.payload.value;
}

const intialState: number = 0;
export default createReducer(intialState, {
  [INCREASE]: handleIncrease,
  [DECREASE]: handleDecrease,
});