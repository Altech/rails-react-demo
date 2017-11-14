import * as React from "react";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import { RouteComponentProps } from "react-router-dom";
import { Location } from "history";

import { css, withStyles } from "../../common/utils/withStyles";
import { RootState } from "../../generateReducer";
import { Project } from "../../common/entities/Project";
import * as actions from "../../actions";
import { projectsSelector } from "../selectors/projectsSelector";
import { locationQuerySelector } from "../selectors/locationSelector";

import ProjectCard from "./ProjectCard";

type OwnProps = {} & RouteComponentProps<{}>;
interface Props {
  projects: Project[];
  search: string;
  location: Location;
  actions: typeof actions;
  styles: {
    base: any;
    header: any;
    cardList: any;
  };
}
type State = {};

class RootContainer extends React.Component<Props, State> {
  componentDidMount() {
    const { projects, actions, location } = this.props;
    if (projects.length === 0) {
      actions.loadPageState(location);
    }
  }

  render() {
    const { projects, styles } = this.props;
    return (
      <div {...css(styles.base)}>
        <h1 {...css(styles.header)}>Top Page</h1>
        <div {...css(styles.cardList)}>
          {projects.map((project, idx) => (
            <ProjectCard key={project.id} index={idx} project={project} />
          ))}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state: RootState, ownProps: OwnProps) {
  return {
    projects: projectsSelector(state),
    search: locationQuerySelector(ownProps),
    location: ownProps.location
  };
}

function mapDispatchToProps(dispatch: Dispatch<actions.Action>) {
  return {
    actions: bindActionCreators({ ...actions }, dispatch)
  };
}

export default withStyles(({ rootWrapper, simpleHeader }) => ({
  base: {
    ...rootWrapper
  },
  header: {
    ...simpleHeader
  },
  cardList: {
    paddingBottom: "4.0em"
  }
}))(connect(mapStateToProps, mapDispatchToProps)(RootContainer));
