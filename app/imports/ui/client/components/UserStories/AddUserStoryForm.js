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
      priority: '',
      color: ''
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
          priority: nextProps.userstoryToEdit.priority,
          color: nextProps.userstoryToEdit.color
        });
        Session.set('warning', 'Caution: you are editing an existing US : US#'+nextProps.userstoryToEdit.id);
      }
    }
    else{
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
    Session.set('success', null);
    Session.set('error', null);
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

    const colors = ['#3c8dbc', '#00c0ef', '#ff851b', '#605ca8', '#D81B60', '#39CCCC', '#d2d6de', '#f56954', '#00a65a'];

    return (
      <div className="row">
        <div className="col-lg-12">
          <h4>Add/Edit an Userstory</h4>
          <form onSubmit={this.handleSubmit} >

            <div className="col-md-4">
              <input placeholder="Description" type="text" className="form-control" value={this.state.description} onChange={this.handleChange('description', false)} required/>
            </div>
            <div className="col-md-2">
              <input placeholder="Effort" type="number" min="0" className="form-control" value={this.state.effort} onChange={this.handleChange('effort', true)} required/>
            </div>
            <div className="col-md-2">
              <input  placeholder="Priority" type="number" min="0" className="form-control" value={this.state.priority} onChange={this.handleChange('priority', true)} required/>
            </div>
            <div className="col-md-2">
              <select value={this.state.color} style={{backgroundColor: this.state.color}}  onChange={this.handleChange('color', false)} className="form-control" required>
                <option value=''>Color</option>
                 {colors.map((color) => (
                <option value={color} style={{backgroundColor: color}}>{color}</option>
                ))}

              </select>
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
