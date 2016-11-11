import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';

class addUserStoryForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      id: 0,
      description: '',
      effort: 0,
      priority: 0
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(key, isInt) {
    return function (e) {
      let state = {};
      if (isInt)
        state[key] = parseInt(e.target.value);
      else
        state[key] = e.target.value;
      this.setState(state);
    }.bind(this);
  }

  handleSubmit(){
    Meteor.call('userstory.add', this.state, this.props.currentProject.name,
                function(err, res) {
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
            <input style={{width: '10%'}} placeholder="Identifiant" type="number" className="form-control" value={this.state.id} onChange={this.handleChange('id', true)}/>
            <input style={{width: '40%'}} placeholder="Description" type="text" className="form-control" value={this.state.description} onChange={this.handleChange('description', false)}/>
            <input style={{width: '20%'}} placeholder="Effort" type="number" className="form-control" value={this.state.effort} onChange={this.handleChange('effort', true)}/>
            <input style={{width: '20%'}} placeholder="Priority" type="number" className="form-control" value={this.state.priority} onChange={this.handleChange('priority', true)}/>
              <div className="input-group-btn">
              <button onClick={this.handleSubmit} className="btn btn-primary btn-block btn-flat">Add</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default addUserStoryForm;
