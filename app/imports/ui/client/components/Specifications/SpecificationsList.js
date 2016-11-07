import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import LinkItem  from '../misc/LinkItem';
import { Session } from 'meteor/session';

class SpecificationsList extends Component {

  constructor(props) {
    super(props);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleDelete(fileId) {
    Meteor.call('specifications.delete', fileId, function(err, res) {
      if (err) {
       Session.set('error', err.message);
       Session.set('success', null);
      } else {
       Session.set('success', 'Done !');
       Session.set('error', null);
      }
   });
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
      <td>{file.meta.uploadDate.toUTCString()}</td>
      <td>
        <a target="_blank" href={file.link()}>
          <button className="btn btn-flat pull-left">
            View
          </button>
        </a>
      </td>
      <td>
        <button className="btn btn-flat pull-right" onClick={ () => { this.handleDelete(file._id) }}
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
          <th>Name</th>
          <th style={{width: 350}}>Uploaded at</th>
          <th style={{width: 20}}>View</th>
          <th style={{width: 20}}>Delete</th>
        </tr>
        {this.props.specifications ? this.renderRows() : ''}
      </tbody>
    </table>
  );
}
}

export default SpecificationsList;
