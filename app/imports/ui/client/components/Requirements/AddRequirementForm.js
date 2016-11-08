import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';

class AddRequirementForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
        description:'',
        priority :''
    };
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handlePriorityChange = this.handlePriorityChange.bind(this);
  }

  handleDescriptionChange(event){
    this.setState({description: event.target.value});

  }

    handlePriorityChange(event){
        this.setState({priority: event.target.value});
    }

  handleSubmit(cat){
    Meteor.call('requirement.add', this.state.description, this.state.priority, cat, this.props.currentProject.name, function(err, res) {
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
            <input type="text" className="form-control" placeholder="Description" value={this.state.description} onChange={this.handleDescriptionChange}/>
            <input type="number" className="form-control" placeholder="Priority" value={this.state.priority} onChange={this.handlePriorityChange}/>
            <div className="input-group-btn">
              <button type="button" className="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Add as..<span className="caret" /></button>
              <ul className="dropdown-menu dropdown-menu-right">
                <li><a href="#" onClick={ () => { this.handleSubmit('f'); }}>Functional requirement</a></li>
                <li><a href="#" onClick={ () => { this.handleSubmit('nf'); }}>Non-functional requirement</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AddRequirementForm;
