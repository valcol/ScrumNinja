import React, { Component } from 'react';
import ProjectMembers from '../../components/ProjectMembers';

class Dashboard extends Component {

  render() {
    return (
      <div className="row">
        <div className="col-lg-6">
          <ProjectMembers {...this.props}/>
        </div>
      </div>
    );
  }
}

export default Dashboard;
