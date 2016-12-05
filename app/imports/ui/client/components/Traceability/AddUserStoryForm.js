import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import FeedbackMessage  from '../misc/FeedbackMessage';

class addUserStoryForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      id: 0,
      trace: ''
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
          trace: nextProps.userstoryToEdit.trace.url
        });
        Session.set('warning', 'Caution: you are editing an existing US : US#'+nextProps.userstoryToEdit.id);
      }
    }
    else{
      this.setState({
        id: 0,
        trace: ''
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
    Session.set('success', null);
    Session.set('error', null);
  }

  handleSubmit(e){
    e.preventDefault();
    Meteor.call('userstory.traceability.upsert', this.state, this.props.currentProject.name,
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

  getColor(id){
    for (userstory of this.props.userstories)
      if (id === userstory.id)
      return userstory.color;
  }

  render(){

    return (
      <div className="row">
        <div className="col-lg-12">
          <h4>Add/Edit traceability</h4>
          <form onSubmit={this.handleSubmit} >
            <div className="col-md-2">
              <select value={this.state.id} style={{backgroundColor: this.getColor(this.state.id)}}  onChange={this.handleChange('id', true)} className="form-control" required>
                <option value=''>US</option>
                 {this.props.userstories.map((us) => (
                <option value={us.id} style={{backgroundColor: this.getColor(us.id)}}>{'US#'+us.id}</option>
                ))}
              </select>
            </div>
            <div className="col-md-8">
              <input placeholder="Url" type="text" className="form-control" value={this.state.trace} onChange={this.handleChange('trace', false)} required/>
            </div>
            {this.props.userstoryToEdit ?
              <div>
                <div className="col-md-1">
                  <button  type="button" onClick={this.handleCancelEdit} className="btn btn-danger btn-block btn-flat">Cancel</button>
                </div>
                <div className="col-md-1">
                  <button className="btn btn-primary btn-block btn-flat">{this.props.userstoryToEdit ? 'Confirm' : 'Add'}</button>
                </div>
              </div>
              : <div className="col-md-2">
              <button className="btn btn-primary btn-block btn-flat">{this.props.userstoryToEdit ? 'Confirm' : 'Add'}</button>
            </div>}
          </form>
        </div>
      </div>
    );
  }
}

export default addUserStoryForm;
