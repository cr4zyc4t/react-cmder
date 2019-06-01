import { AnyAction, Action, Reducer } from "redux";

export type CaseReducer<S = any, A extends Action = AnyAction> = (
  state: S,
  action: A
) => S | void

export interface CaseReducersMapObject<S = any, A extends Action = AnyAction> {
  [actionType: string]: CaseReducer<S, A>
}

export function createReducer<S = any, A extends Action = AnyAction>(
  initialState: S,
  actionsMap: CaseReducersMapObject<S, A>
): Reducer<S> {
  return function (state = initialState, action): S {
    const caseReducer = actionsMap[action.type];
    // @ts-ignore
    return caseReducer ? caseReducer(state, action as A) : state;
  };
}
