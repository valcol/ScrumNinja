import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import { createContainer } from 'meteor/react-meteor-data';
import { Collections } from '../../../api/collections.js';
import  { UserRow }  from './UserRow.jsx';

class UsersList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email:''
    };
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleEmailChange(event){
    this.setState({email: event.target.value});
  }


  handleSubmit(role){
    Meteor.call('permission.addViaEmail', this.state.email, this.props.projectName, role, function(err, res) {
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


  renderRows(roles){
    return Object.keys(roles).map((key) => (
      <UserRow
        isAdmin={this.isAdmin()}
        role={roles[key]}
        projectName = {this.props.projectName}
        userId={key}
      />
    ));
  }

  render() {
    return (
            <div className="box">
              <div className="box-header with-border">
                <h3 className="box-title">Members</h3>
              </div>
              {/* /.box-header */}
              <div className="box-body pad">
                <div className="table-responsive">
                  <table className="table">
                    <tr>
                      <th>
                        Name
                      </th>
                      <th>
                        Role
                      </th>
                    </tr>
                  {this.renderRows(this.props.currentProject.roles)}
                  </table>
                </div>
                { this.props.error ?
                <div className="callout callout-danger">
                    {this.props.error}
                </div>
                : this.props.success ?
                <div className="callout callout-success">
                    {this.props.success}
                </div>
                :
                <div></div>
                }
            </div>
            <div className="box-footer">
              {this.isAdmin() ?
                <div className="row">
                    <div className="col-lg-12">
                      <div className="input-group">
                        <input type="text" className="form-control" placeholder="Email" value={this.state.email} onChange={this.handleEmailChange}/>
                        <div className="input-group-btn">
                          <button type="button" className="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Add as..<span className="caret" /></button>
                          <ul className="dropdown-menu dropdown-menu-right">
                            <li><a href="#" onClick={ () => { this.handleSubmit('pa'); }}>Administrator</a></li>
                            <li><a href="#" onClick={ () => { this.handleSubmit('pm'); }}>Project Member</a></li>
                            <li><a href="#" onClick={ () => { this.handleSubmit('po'); }}>Project Owner</a></li>
                            <li role="separator" className="divider" />
                            <li><a href="#">Separated link</a></li>
                          </ul>
                        </div>
                      </div>


                    </div>
                  </div>
                  :
                  ''
              }
            </div>
      </div>
      );
    }
}

export default createContainer((props) => {
  return {
    currentProject: Collections.Projects.findOne({name:props.projectName}),
    error: Session.get('error'),
    success: Session.get('success')
  };
}, UsersList);
