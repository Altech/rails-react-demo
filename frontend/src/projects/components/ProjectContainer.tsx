import * as React from "react";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import { RouteComponentProps, Link } from "react-router-dom";
import { Location } from "history";

import { css, withStyles } from "../../common/utils/withStyles";
import { RootState } from "../../generateReducer";
import { Project } from "../../common/entities/Project";
import * as actions from "../../actions";
import { projectSelector } from "../selectors/projectsSelector";

type URLParams = {
  id: string;
};
type OwnProps = {} & RouteComponentProps<URLParams>;

type Style = {
  base: React.CSSProperties;
  header: React.CSSProperties;
  image: React.CSSProperties;
  companyInfo: React.CSSProperties;
  companyIcon: React.CSSProperties;
  companyName: React.CSSProperties;
};
type Props = {
  project: Project;
  location: Location;
  actions: typeof actions;
  styles: Record<keyof Style, any>;
};
type State = {};

class ProjectContainer extends React.Component<Props, State> {
  componentDidMount() {
    const { project, actions, location } = this.props;
    if (!project.description) {
      actions.loadPageState(location);
    }
  }

  render() {
    const { project, styles } = this.props;
    return (
      <div {...css(styles.base)}>
        <h1 {...css(styles.header)}>{project.title}</h1>
        <div {...css(styles.companyInfo)}>
          <img
            {...css(styles.companyIcon)}
            src={project.company.avatar.url}
            alt={project.company.name}
          />
          <span {...css(styles.companyName)}>{project.company.name}</span>
        </div>
        <img
          {...css(styles.image)}
          src={project.image.url}
          alt={project.title}
        />
        <p>
          <span>This project's ID is&nbsp;</span>
          <strong>{project.id}</strong>
        </p>
        <div dangerouslySetInnerHTML={{ __html: project.description }} />
        <span>
          <Link to="/projects">Go back</Link>
        </span>
      </div>
    );
  }
}

function mapStateToProps(state: RootState, ownProps: OwnProps) {
  return {
    project: projectSelector(state, ownProps),
    location: ownProps.location
  };
}

function mapDispatchToProps(dispatch: Dispatch<actions.Action>) {
  return {
    actions: bindActionCreators({ ...actions }, dispatch)
  };
}

export default withStyles<Style>(({ rootWrapper, simpleHeader }) => ({
  base: {
    ...rootWrapper
  },
  header: {
    ...simpleHeader
  },
  image: {
    width: "100%"
  },
  companyInfo: {
    display: "flex",
    alignItems: "center",
    padding: "1em 0"
  },
  companyIcon: {
    display: "inline-block",
    boxShadow: "0 0 0 1px rgba(0, 0, 0, 0.125)",
    width: 40,
    height: 40
  },
  companyName: {
    padding: "0 1.0em"
  }
}))(connect(mapStateToProps, mapDispatchToProps)(ProjectContainer));
