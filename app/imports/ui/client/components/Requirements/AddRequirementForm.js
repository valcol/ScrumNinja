import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';

class AddRequirementForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      id: 0,
      description:'',
      priority :''
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

  handleSubmit(cat){
    Meteor.call('requirement.add', this.state, cat, this.props.currentProject.name, function(err, res) {
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
          <h4>Add a Requirement</h4>
          <form>
            <div className="col-md-8">
              <input placeholder="Description" type="text" className="form-control" value={this.state.description} onChange={this.handleChange('description', false)} required/>
            </div>

            <div className="col-md-2">
              <input placeholder="Priority" type="number" min="0" className="form-control" value={this.state.priority} onChange={this.handleChange('priority', true)} required/>
            </div>

            <div className="col-md-2">
                <button type="button" className="btn btn-primary btn-block btn-flat dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Add as <span className="caret" /></button>
                <ul className="dropdown-menu dropdown-menu-right">
                  <li><a href="#" onClick={ () => { this.handleSubmit('f'); }}>Functional requirement</a></li>
                  <li><a href="#" onClick={ () => { this.handleSubmit('nf'); }}>Non-functional requirement</a></li>
                </ul>
                </div>
            </form>
        </div>
      </div>
    );
  }
}

export default AddRequirementForm;
