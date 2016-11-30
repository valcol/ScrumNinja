import React, { Component } from 'react';
import ProjectMembers from '../../components/ProjectMembers';
import Burndown from '../../components/BurndownChart';

class Dashboard extends Component {

  render() {
    return (
      <div className="row" style={{minHeight:'300px'}}>
        <div className="col-lg-6" style={{height:'300px'}}>
          <ProjectMembers {...this.props}/>
        </div>
        <div className="col-lg-6" style={{height:'300px'}}>
          <Burndown {...this.props}/>
        </div>
      </div>
    );
  }
}

export default Dashboard;
