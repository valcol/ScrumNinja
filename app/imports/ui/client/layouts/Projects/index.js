import React, { Component } from 'react';
import ProjectsList from '../../components/ProjectsList';
import PublicProjectsList from '../../components/PublicProjectsList'

class Projects extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="projects">
        <ProjectsList/>
        <PublicProjectsList/>
      </div>
    );
  }
}

export default Projects;
