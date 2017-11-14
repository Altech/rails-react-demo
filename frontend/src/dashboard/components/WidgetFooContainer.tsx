import * as React from "react";
import * as ReactDOM from "react-dom";

type PropTypes = {};
type StateTypes = {};

class WidgetFooContainer extends React.Component<PropTypes, StateTypes> {
  public node = document.getElementById("widget-foo");

  render() {
    if (!this.node) {
      return null;
    }
    return ReactDOM.createPortal(<div>Foo?</div>, this.node);
  }
}

export default WidgetFooContainer;
