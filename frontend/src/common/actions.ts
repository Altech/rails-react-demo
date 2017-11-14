import { Dispatch } from "redux";
import { Location } from "history";

import * as ActionTypes from "../ActionTypes";
import { RootState } from "../generateReducer";
import { Entities } from "./entities/Entities";
import { generateState, APIData } from "./utils/generateStateFromAPIData";

type UpdateEntitiesAction = {
  type: typeof ActionTypes.COMMON.ENTITIES_UPDATE;
  entities: Entities;
};
export function updateEntities(entities: Entities): UpdateEntitiesAction {
  return {
    type: ActionTypes.COMMON.ENTITIES_UPDATE,
    entities
  };
}

type LoadPageStateAction = {
  type: typeof ActionTypes.COMMON.PAGE_STATE_LOAD;
  state: Partial<RootState>;
};
type FailedLoadPageStateAction = {
  type: typeof ActionTypes.COMMON.PAGE_STATE_LOAD_FAILED;
};
export function loadPageState(location: Location) {
  return async (dispatch: Dispatch<any>) => {
    try {
      const pathname =
        location.pathname.slice(-1) === "/"
          ? location.pathname.slice(0, -1)
          : location.pathname;
      const APIPath = `${pathname}.json`;
      const data: APIData = await fetch(APIPath, {
        credentials: "include"
      }).then(res => res.json());

      return dispatch<LoadPageStateAction>({
        type: ActionTypes.COMMON.PAGE_STATE_LOAD,
        state: generateState(data)
      });
    } catch (err) {
      console.error(err);
      return dispatch<FailedLoadPageStateAction>({
        type: ActionTypes.COMMON.PAGE_STATE_LOAD_FAILED
      });
    }
  };
}

export type Action =
  | UpdateEntitiesAction
  | LoadPageStateAction
  | FailedLoadPageStateAction;
