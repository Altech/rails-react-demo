export type ProjectsShowState = {
  project: number;
};

const initialState: ProjectsShowState = {
  project: -1
};

export default function entitiesReducer(
  state = initialState,
  action: any
): ProjectsShowState {
  switch (action.type) {
    default: {
      return state;
    }
  }
}
