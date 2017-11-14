import * as React from "react";
import { Route, Switch } from "react-router-dom";

import AsyncRoute from "./common/utils/AsyncRoute";
import AsyncComponent from "./common/components/AsyncComponent";

export const routes: AsyncRoute[] = [
  new AsyncRoute({
    path: "/projects",
    loader: () => import("./projects/router")
  }),
  new AsyncRoute({
    path: "/",
    loader: () => import("./dashboard/components/RootContainer")
  })
];

const Router = () => (
  <Switch>
    {routes.map(route => {
      return (
        <Route path={route.path} key={route.path}>
          <AsyncComponent route={route} />
        </Route>
      );
    })}
  </Switch>
);

export default Router;
