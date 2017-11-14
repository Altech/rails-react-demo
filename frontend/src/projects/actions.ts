import * as ActionTypes from "../ActionTypes";

type InitializeAction = {
  type: typeof ActionTypes.PROJECTS.INIT;
};
export function initialize(): InitializeAction {
  return {
    type: ActionTypes.PROJECTS.INIT
  };
}

export type Action = InitializeAction;
