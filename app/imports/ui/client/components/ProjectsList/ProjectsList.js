import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import LinkItem from '../misc/LinkItem';

class ProjectsList extends Component {

  constructor(props) {
    super(props);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleDelete(projectName) {
    Meteor.call('project.delete', projectName);
  }

  renderRows(){
    return this.props.projects.map((project) => (
      <tr>
        <td>{project.name}</td>
        <td>{project.visibility}</td>
        <td>{Object.keys(project.roles).length}</td>
        <td>
          <div className="progress progress-xs">
            <div className="progress-bar progress-bar-danger" style={{width: '55%'}}></div>
          </div>
        </td>
        <td>
          <LinkItem to={'/p/'+project.name+'/'} >
            <button className="btn btn-flat pull-left">
              Go to Dashboard
            </button>
          </LinkItem>
        </td>
        <td>
          <button className="btn btn-flat pull-right" onClick={ () => { this.handleDelete(project.name); } }
            disabled={!(project.roles[Meteor.userId()] === 'pa')}>
            Delete
          </button>
        </td>
      </tr>
    ));
  }

  render() {
    return (
      <table className="table table-striped">
        <tbody><tr>
          <th style={{width: 150}}>Name</th>
          <th style={{width: 100}}><span className="glyphicon glyphicon-eye-open"></span></th>
          <th style={{width: 100}}><span className="glyphicon glyphicon-user"></span></th>
          <th>Progress</th>
          <th style={{width: 20}}>Dashboard</th>
          <th style={{width: 20}}>Delete</th>
        </tr>
        {this.renderRows()}
      </tbody>
    </table>
  );
}
}

export default ProjectsList;
