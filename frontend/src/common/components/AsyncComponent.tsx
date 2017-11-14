import * as React from "react";

import AsyncRoute from "../utils/AsyncRoute";

type Props = {
  route: AsyncRoute;
};
type State = {
  component?: React.ComponentType;
};

export default class AsyncComponent extends React.Component<Props, State> {
  componentDidMount() {
    const { route } = this.props;
    if (!route.component) {
      route.load().then(() => {
        this.forceUpdate();
      });
    }
  }

  render() {
    const { route, ...rest } = this.props;
    if (route.component) {
      return <route.component {...rest} />;
    }
    return null;
  }
}
