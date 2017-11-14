import { createSelector } from "reselect";
import { RouteComponentProps } from "react-router-dom";
import { RootState } from "../../generateReducer";
import { denormalize } from "../../common/utils/normalizer";
import { Entities } from "../../common/entities/Entities";
import { Project, ProjectSchema } from "../../common/entities/Project";

export const projectsSelector = createSelector(
  [
    (state: RootState) => state.projects.index.projects,
    (state: RootState) => state.entities
  ],
  (projectIds, entities) =>
    denormalize(projectIds, [ProjectSchema], entities) as Project[]
);

export const projectSelector = createSelector(
  [
    (_state: RootState, ownProps: RouteComponentProps<{ id: string }>) =>
      ownProps.match.params.id,
    (state: RootState) => state.entities
  ],
  (projectId, entities: Entities) =>
    denormalize(projectId, ProjectSchema, entities) as Project
);
