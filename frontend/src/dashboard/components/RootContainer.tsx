import * as React from "react";

import WidgetFooContainer from "./WidgetFooContainer";
import WidgetBarContainer from "./WidgetBarContainer";

type PropTypes = {};
type StateTypes = {};

class RootContainer extends React.Component<PropTypes, StateTypes> {
  render() {
    return [<WidgetFooContainer key="foo" />, <WidgetBarContainer key="bar" />];
  }
}

export default RootContainer;
