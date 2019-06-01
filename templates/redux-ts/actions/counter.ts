export const INCREASE = "@counter/increase";
export const increase = (value: number) => ({
  type: INCREASE,
  payload: {
    value,
  },
});
export type IncreaseAction = ReturnType<typeof increase>;

export const DECREASE = "@counter/decrease";
export const decrease = (value: number) => ({
  type: DECREASE,
  payload: {
    value,
  },
});
export type DecreaseAction = ReturnType<typeof decrease>;
