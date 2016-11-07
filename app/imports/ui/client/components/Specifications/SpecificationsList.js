import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import LinkItem  from '../misc/LinkItem';

class SpecificationsList extends Component {

  constructor(props) {
    super(props);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleDelete(projectName) {
    Meteor.call('project.delete', projectName);
  }

  isAdmin(){
    return (this.props.currentProject.roles[Meteor.userId()] === 'pa');
  }

  isPo(){
    return (this.props.currentProject.roles[Meteor.userId()] === 'po');
  }

renderRows(){
  return this.props.specifications.map((file) => (
    <tr>
      <td>{file.name}</td>
      <td>file</td>
      <td>
        <a target="_blank" href={file.link()}>
          <button className="btn btn-flat pull-left">
            View
          </button>
        </a>
      </td>
      <td>
        <button className="btn btn-flat pull-right" onClick={file.remove}
          disabled={!(this.isPo) || !(this.isAdmin)}>
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
          <th style={{width: 100}}>Uploaded at</th>
          <th style={{width: 20}}>Download</th>
          <th style={{width: 20}}>Delete</th>
        </tr>
        {this.props.specifications ? this.renderRows() : ''}
      </tbody>
    </table>
  );
}
}

export default SpecificationsList;
