export function createReducer(initialState, actionsMap) {
  return function (state = initialState, action) {
    const caseReducer = actionsMap[action.type]; // @ts-ignore

    return caseReducer ? caseReducer(state, action) : state;
  };
}