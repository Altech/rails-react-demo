import * as React from "react";
import { Link } from "react-router-dom";

import { css, withStyles } from "../../common/utils/withStyles";
import { Project } from "../../common/entities/Project";

interface Style {
  base: React.CSSProperties;
  link: React.CSSProperties;
  title: React.CSSProperties;
  image: React.CSSProperties;
  companyInfo: React.CSSProperties;
  companyIcon: React.CSSProperties;
  companyName: React.CSSProperties;
}
interface Props {
  project: Project;
  index: number;
  styles: Record<keyof Style, any>;
}
type State = {};

class ProjectCard extends React.Component<Props, State> {
  render() {
    const { project, index, styles } = this.props;
    return (
      <div
        {...css(styles.base)}
        style={{ paddingTop: index === 0 ? "30px" : null }}
      >
        <Link {...css(styles.link)} to={project.canonical_path}>
          <div
            {...css(styles.image)}
            style={{ backgroundImage: `url(${project.image.url})` }}
          />
          <h2 {...css(styles.title)}>{project.title}</h2>
        </Link>
        <div {...css(styles.companyInfo)}>
          <img
            {...css(styles.companyIcon)}
            src={project.company.avatar.url}
            alt={project.company.name}
          />
          <span {...css(styles.companyName)}>{project.company.name}</span>
        </div>
      </div>
    );
  }
}

export default withStyles<Style>(({ colors }) => ({
  base: {
    width: 560,
    margin: "auto",
    padding: "50px 0 30px 0",
    borderBottom: `1px solid ${colors.layoutLightBorder}`,
    color: colors.gray4
  },
  link: {
    textDecoration: "none",
    display: "inline-block",
    color: "inherit",
    ":hover": {
      color: colors.blue1
    }
  },
  title: {
    transition: "color ease 0.25s",
    fontSize: "22px"
  },
  image: {
    width: 560,
    height: 225,
    backgroundColor: colors.lightergray3,
    backgroundPosition: "center center",
    backgroundSize: "cover"
  },
  companyInfo: {
    display: "flex",
    alignItems: "center"
  },
  companyIcon: {
    display: "inline-block",
    borderRadius: "50%",
    boxShadow: "0 0 0 1px rgba(0, 0, 0, 0.125)",
    width: 50,
    height: 50
  },
  companyName: {
    padding: "0 1.0em"
  }
}))(ProjectCard);
