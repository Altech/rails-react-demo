export type ProjectsIndexState = {
  projects: number[];
  featured_projects: number[];
};

const initialState: ProjectsIndexState = {
  projects: [],
  featured_projects: []
};

export default function entitiesReducer(
  state = initialState,
  action: any
): ProjectsIndexState {
  switch (action.type) {
    default: {
      return state;
    }
  }
}
