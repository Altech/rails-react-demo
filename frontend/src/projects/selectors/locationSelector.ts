import { createSelector } from "reselect";
import { RouteComponentProps } from "react-router-dom";

export const locationQuerySelector = createSelector(
  (props: RouteComponentProps<any>) => props.location.search,
  query => query
);
