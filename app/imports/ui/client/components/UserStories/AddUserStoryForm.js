import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import FeedbackMessage  from '../misc/FeedbackMessage';

class addUserStoryForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      id: '',
      description: '',
      effort: '',
      priority: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleIdChange = this.handleIdChange.bind(this);
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
    else{
      this.setState({
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

  handleIdChange(event){

    for (let userstory of this.props.userstories) {
      if (parseInt(userstory.id) === parseInt(event.target.value)){
        Session.set('userstoryToEdit', userstory._id);
        return;
      }
    }

    this.setState({id: parseInt(event.target.value)});
    Session.set('userstoryToEdit', null);
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
            <input style={{width: '10%'}} placeholder="Identifiant" type="number" className="form-control" value={this.state.id} onChange={this.handleIdChange}/>
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
