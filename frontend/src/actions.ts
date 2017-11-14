import { Action as CommonAction } from "./common/actions";
export * from "./common/actions";
import { Action as ProjectsAction } from "./projects/actions";
export * from "./projects/actions";

export type Action = CommonAction | ProjectsAction;
