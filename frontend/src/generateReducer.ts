import { combineReducers, Action } from "redux";
import { routerReducer, RouterState } from "react-router-redux";
import projects, { ProjectsState } from "./projects/reducer";
import entities, { EntitiesState } from "./common/reducers/entitiesReducer";
import rootReducer from "./common/reducers/rootReducer";

export type RootState = {
  entities: EntitiesState;
  projects: ProjectsState;
  router: RouterState;
};

const generateReducer = () => {
  const combinedReducer = combineReducers<RootState>({
    entities,
    projects,
    router: routerReducer
  });

  return (prevState: RootState, action: Action) => {
    let state = combinedReducer(prevState, action);
    state = rootReducer(state, action);
    return state;
  };
};
export default generateReducer;
