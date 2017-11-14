import * as React from "react";
import { Route, Switch } from "react-router-dom";

import RootContainer from "./components/RootContainer";
import ProjectContainer from "./components/ProjectContainer";

const Router: React.SFC = () => (
  <Switch>
    <Route exact path="/projects" component={RootContainer} />
    <Route exact path="/projects/:id" component={ProjectContainer} />
  </Switch>
);

export default Router;
