import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import LinkItem  from '../misc/LinkItem';


class PublicProjectsList extends Component {

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
      <td>{Object.keys(project.roles).length}</td>
      <td>
        <div className="progress progress-xs">
          <div className="progress-bar progress-bar-success" style={{width: '55%'}}></div>
        </div>
      </td>
      <td>
        <LinkItem to={'/p/'+project.name+'/'} >
          <button className="btn btn-flat btn-primary pull-left">
            Dashboard
          </button>
        </LinkItem>
      </td>
    </tr>
  ));
}

  render() {
    return (
      <table className="table table-striped">
        <tbody><tr>
          <th style={{width: 150}}>Name</th>
          <th style={{width: 100}}><span className="glyphicon glyphicon-user"></span></th>
          <th>Progress</th>
          <th style={{width: 20}}></th>
        </tr>
        {this.renderRows()}
      </tbody>
    </table>
  );
}
}

export default PublicProjectsList;
