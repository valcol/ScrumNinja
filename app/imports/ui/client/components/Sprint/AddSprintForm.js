import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';

class AddSprintForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      start: '',
      end: '',
      description: '',
      number: ''
    };
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleBeginChange = this.handleBeginChange.bind(this);
    this.handleEndChange = this.handleEndChange.bind(this);
    this.handleNumberChange = this.handleNumberChange.bind(this);
  }

  handleDescriptionChange(event){
    this.setState({description: event.target.value});
  }
  handleBeginChange(event){
    this.setState({start: event.target.value});
  }
  handleEndChange(event){
    this.setState({end: event.target.value});
  }
  handleNumberChange(event){
    this.setState({number: event.target.value});
  }

  handleSubmit(){
    Meteor.call('sprint.add', this.state.start, this.state.end, this.state.description, this.state.number, this.props.currentProject.name, function(err, res) {
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
            {/* Date range */}
            <div className="form-group">
              <label>Start:</label>
              <div className="input-group date">
                <div className="input-group-addon">
                  <i className="fa fa-calendar" />
                </div>
                <input type="date" onChange={this.handleBeginChange} value={this.state.start} id="start" className="form-control pull-right datepicker" required />
              </div>
              {/* /.input group */}
            </div>
            <div className="form-group">
              <label>End:</label>
              <div className="input-group date">
                <div className="input-group-addon">
                  <i className="fa fa-calendar" />
                </div>
                <input type="date" onChange={this.handleEndChange} value={this.state.end} id="end" className="form-control pull-right datepicker" required />
              </div>
              {/* /.input group */}
            </div>
            <input type="text" className="form-control" placeholder="Description" value={this.state.description} onChange={this.handleDescriptionChange}/>
            <input type="number" className="form-control" placeholder="Number" value={this.state.number} onChange={this.handleNumberChange}/>
            <div className="input-group-btn">
              <button className="btn btn-flat center-block" onClick={this.handleSubmit}> Add </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AddSprintForm;
