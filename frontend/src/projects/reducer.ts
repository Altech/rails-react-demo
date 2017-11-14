import { combineReducers } from "redux";
import index, { ProjectsIndexState } from "./reducers/indexReducer";
import show, { ProjectsShowState } from "./reducers/showReducer";

export type ProjectsState = {
  index: ProjectsIndexState;
  show: ProjectsShowState;
};

export default combineReducers({
  index,
  show
});
