import * as ActionTypes from "../../ActionTypes";
import { Action } from "../../actions";
import { Entities } from "../entities/Entities";

export type EntitiesState = Entities;
const initialState: EntitiesState = new Entities();

export default function entitiesReducer(
  state = initialState,
  action: Action
): EntitiesState {
  switch (action.type) {
    case ActionTypes.COMMON.ENTITIES_UPDATE: {
      return state.mergeDeep(action.entities);
    }
    default: {
      return state;
    }
  }
}
