import * as ActionTypes from "../../ActionTypes";
import { Action } from "../../actions";
import { RootState } from "../../generateReducer";

export default function rootReducer(
  state: RootState,
  action: Action
): RootState {
  switch (action.type) {
    case ActionTypes.COMMON.PAGE_STATE_LOAD: {
      const { router, entities, ..._recieved } = action.state;
      const recieved: any = _recieved;
      const newState: any = { ...state };

      for (const controller in recieved) {
        for (const action in recieved[controller]) {
          if (
            (newState as object).hasOwnProperty(controller) &&
            (newState[controller] as object).hasOwnProperty(action)
          ) {
            const newPageState = recieved[controller][action];
            newState[controller][action] = newPageState;
          }
        }
      }

      return {
        ...newState,
        entities: state.entities.mergeDeep(entities!)
      };
    }
    default: {
      return state;
    }
  }
}
