import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import FeedbackMessage  from '../misc/FeedbackMessage';

class addUserStoryForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      id: 0,
      description: '',
      effort: '',
      priority: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCancelEdit = this.handleCancelEdit.bind(this);
  }

  componentWillReceiveProps(nextProps){
    if (nextProps.userstoryToEdit) {
      if (nextProps.userstoryToEdit !== this.props.userstoryToEdit) {
        this.setState({
          id: nextProps.userstoryToEdit.id,
          description: nextProps.userstoryToEdit.description,
          effort: nextProps.userstoryToEdit.effort,
          priority: nextProps.userstoryToEdit.priority
        });
        Session.set('warning', 'Caution: you are editing an existing US : US#'+nextProps.userstoryToEdit.id);
      }
    }
    else {
      this.setState({
        id: 0,
        description: '',
        effort: '',
        priority: ''
      });
      Session.set('warning', null);
    }
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

  handleCancelEdit(event){
    Session.set('userstoryToEdit', null);
  }

  handleSubmit(e){
    e.preventDefault();
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

    if (this.props.userstoryToEdit)
      Session.set('userstoryToEdit', null);
  }

  render(){
    return (
      <div className="row">
        <div className="col-lg-12">
          <form onSubmit={this.handleSubmit}>
          <div className="input-group">
            <input style={{width: '40%'}} placeholder="Description" type="text" className="form-control" value={this.state.description} onChange={this.handleChange('description', false)}/>
            <input style={{width: '20%'}} placeholder="Effort" type="number" className="form-control" value={this.state.effort} onChange={this.handleChange('effort', true)}/>
            <input style={{width: '20%'}} placeholder="Priority" type="number" className="form-control" value={this.state.priority} onChange={this.handleChange('priority', true)}/>
            {this.props.userstoryToEdit ?
            <div className="input-group-btn">
            <button onClick={this.handleCancelEdit} className="btn btn-primary btn-block btn-flat">Cancel edit</button>
            </div> : ''}
            <div className="input-group-btn">
              <button className="btn btn-primary btn-block btn-flat">{this.props.userstoryToEdit ? 'Confirm' : 'Add'}</button>
            </div>
          </div>
          </form>
        </div>
      </div>
    );
  }
}

export default addUserStoryForm;
