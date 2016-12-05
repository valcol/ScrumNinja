import React, { Component } from 'react';
import { Session } from 'meteor/session';

class MemberRow extends Component {

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleDelete(event) {
    Meteor.call('permission.delete', this.props.userId, this.props.currentProject.name, function(err, res) {
      if (err) {
       Session.set('error', err.message);
       Session.set('success', null);
      } else {
       Session.set('success', 'Done !');
       Session.set('error', null);
      }
   });
  }

  handleChange(event) {
    Meteor.call('permission.upsert', this.props.userId, this.props.currentProject.name, event.target.value, function(err, res) {
      if (err) {
       Session.set('error', err.message);
       Session.set('success', null);
     } else {
       Session.set('success', 'Done !');
       Session.set('error', null);
     }
   });
  }

  renderAdminRow(){
    return (
      <tr>
        <td>
          <div>
        <a data-toggle="modal" data-target={'#mymodal'+this.props.userId}>
          {Meteor.users.findOne({_id:this.props.userId}).username}
        </a>
        <div className="modal fade" id={'mymodal'+this.props.userId} tabIndex={-1} role="dialog" aria-labelledby="myModalLabel">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
                <h4 className="modal-title" id="myModalLabel">{Meteor.users.findOne({_id:this.props.userId}).username} s Informations :</h4>
              </div>
              <div className="modal-body">
                <table className="table">
                  <tbody>
                  <tr>
                    <td>
                      <strong>Username</strong>
                    </td>
                    <td>
                      {Meteor.users.findOne({_id:this.props.userId}).username}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Email</strong>
                    </td>
                    <td>
                      {Meteor.users.findOne({_id:this.props.userId}).emails[0].address}
                    </td>
                  </tr>
                  </tbody>
                </table>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-primary btn-flat center-block" data-dismiss="modal">Close</button>
              </div>
            </div>
          </div>
        </div>
      </div>
        </td>
        <td>
          <select value={this.props.role} onChange={this.handleChange} className="form-control">
            <option value='pa'>Administrator</option>
            <option value='pm'>Member</option>
            <option value='po'>Product Owner</option>
          </select>
        </td>
        <td>
          <button className="btn btn-flat btn-danger pull-right" onClick={ () => { this.handleDelete(); } }>
            Delete
          </button>
        </td>
      </tr>
    );
  }

  renderRow() {
    let roleReadable = {pa:'Administrator', pm:'Member', po:'Product Owner'};
    return (
      <tr>
        <td>
          {Meteor.users.findOne({_id:this.props.userId}).username}
        </td>
        <td>
        {roleReadable[this.props.role]}
        </td>
      </tr>
    );
  }

  render() {
      if (this.props.isAdmin)
        return this.renderAdminRow();
      else
        return this.renderRow();
  }
}

export default MemberRow;
