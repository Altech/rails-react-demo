import * as React from "react";
import * as ReactDOM from "react-dom";

type PropTypes = {};
type StateTypes = {};

class WidgetBarContainer extends React.Component<PropTypes, StateTypes> {
  public node = document.getElementById("widget-bar");

  render() {
    if (!this.node) {
      return null;
    }
    return ReactDOM.createPortal(<div>Bar</div>, this.node);
  }
}

export default WidgetBarContainer;
