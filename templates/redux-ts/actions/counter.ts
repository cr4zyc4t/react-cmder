import { Dispatch } from "redux";

export const INCREASE = "@counter/increase";
export const increase = (value: number) => ({
  type: INCREASE,
  payload: {
    value,
  },
});

export const DECREASE = "@counter/decrease";
export const decrease = (value: number) => ({
  type: DECREASE,
  payload: {
    value,
  },
});

export const asyncIncrease = (value: number) => (dispatch: Dispatch) => {
  setTimeout(() => {
    dispatch(increase(value));
  }, 1000);
};
