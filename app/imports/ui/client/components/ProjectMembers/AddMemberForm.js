import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import { createContainer } from 'meteor/react-meteor-data';

class AddMemberForm extends Component {

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
    Meteor.call('permission.addViaEmail', this.state.email, this.props.currentProject.name, role, function(err, res) {
     if (err) {
       Session.set('error', err.message);
       Session.set('success', null);
     } else {
       Session.set('success', 'Done !');
       Session.set('error', null);
     }
   });
  }

  render(){
    return (
      <div className="row">
        <div className="col-lg-12">
          <div className="input-group">
            <input type="text" className="form-control" placeholder="Email" value={this.state.email} onChange={this.handleEmailChange}/>
            <div className="input-group-btn">
              <button type="button" className="btn btn-primary btn-flat dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Add as <span className="caret" /></button>
              <ul className="dropdown-menu dropdown-menu-right">
                <li><a href="#" onClick={ () => { this.handleSubmit('pa'); }}>Administrator</a></li>
                <li><a href="#" onClick={ () => { this.handleSubmit('pm'); }}>Project Member</a></li>
                <li><a href="#" onClick={ () => { this.handleSubmit('po'); }}>Project Owner</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AddMemberForm;
