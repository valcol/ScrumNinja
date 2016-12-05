import React, { Component } from 'react';
import { Session } from 'meteor/session';
import FeedbackMessage  from '../misc/FeedbackMessage';
import Box from '../misc/Box';
import BoxHeader from '../misc/BoxHeader';
import BoxBody from '../misc/BoxBody';
import BoxFooter from '../misc/BoxFooter';
import Loading from '../misc/Loading';
import { DragSource } from 'react-dnd';

const cardSource = {
  beginDrag(props) {
    console.log('begin');
    return {
      description: props.task.description
    };
  },

  endDrag(props, monitor) {
    const item = monitor.getItem();
    const dropResult = monitor.getDropResult();
    console.log('end');


    if (dropResult) {

      if (parseInt(dropResult.state) === 4){
        let usFinished = [];
        let callForTrace = true;
        for (usId of props.task.userstory) {
          for (task of props.tasks){
            if (task._id !== props.task._id && task.userstory.indexOf(usId) > -1 && task.state < 4){
              callForTrace = false;
            }
          }
          if (callForTrace)
            usFinished.push(usId);
        }

       if (usFinished.length > 0){
        Session.set('usTrace', usFinished);
        $("#myModal").modal("show");
       }
      }

      let taskUpdate = {
        id : props.task.id,
        description : props.task.description,
        userstory : props.task.userstory,
        state : parseInt(dropResult.state)
      };

      Meteor.call('tasks.update', taskUpdate, props.currentProject.name, function(err, res) {
        if (err) {
          Session.set('error', err.message);
          Session.set('success', null);
        } else {
          Session.set('success', 'Done !');
          Session.set('error', null);
        }
      });
    }

  }
};

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  };
}

class Card extends Component {

  constructor(props) {
    super(props);
  }

  getColor(id){
    for (userstory of this.props.userstories)
      if (id === userstory.id)
      return userstory.color;
  }

  renderUs(userstories){
    return userstories.sort().map((userstory) => (<span className='badge' style={{backgroundColor: this.getColor(userstory)}} >#{userstory}</span>));
  }

  renderUsers(users){
    if (users)
    return users.sort().map((user) => (<span className='badge' style={{backgroundColor: 'lightgrey'}} >{Meteor.users.findOne({_id:user}).username}</span>));
  }


  handleAdd(_id){
    Meteor.call('tasks.addUser', _id, function(err, res) {
      if (err) {
        Session.set('error', err.message);
        Session.set('success', null);
      } else {
        Session.set('success', 'Done !');
        Session.set('error', null);
      }
    });
  }

render() {

 const { connectDragSource, isDragging } = this.props;

  return connectDragSource(
    <div>
    {
    (this.props.task.isLate) ?
    <Box className= 'box box-danger'>
      <div className="box-header with-border">
        <h4 className="box-title">
          {this.renderUs(this.props.task.userstory)}
        </h4>
        <div className="pull-right">
          {((this.props.task.users) && (this.props.task.users.indexOf(Meteor.userId())>-1)) ?
          <button type="button" onClick={() => {this.handleAdd(this.props.task._id); }} className="btn btn-box-tool" data-widget="collapse"><i className="fa fa-minus"></i>
          </button>
          :
          <button type="button" onClick={() => {this.handleAdd(this.props.task._id); }} className="btn btn-box-tool" data-widget="collapse"><i className="fa fa-plus"></i>
          </button>}
        </div>
      </div>
      <BoxBody>
        {this.props.task.description}
      </BoxBody>
      <BoxFooter>{this.renderUsers(this.props.task.users)}</BoxFooter>
    </Box>
    :
    <Box className='box box-primary'>
      <div className="box-header with-border">
        <h4 className="box-title">
          {this.renderUs(this.props.task.userstory)}
        </h4>
        <div className="pull-right">
          {((this.props.task.users) && (this.props.task.users.indexOf(Meteor.userId())>-1)) ?
          <button type="button" onClick={() => {this.handleAdd(this.props.task._id); }} className="btn btn-box-tool" data-widget="collapse"><i className="fa fa-minus"></i>
          </button>
          :
          <button type="button" onClick={() => {this.handleAdd(this.props.task._id); }} className="btn btn-box-tool" data-widget="collapse"><i className="fa fa-plus"></i>
          </button>}
        </div>
      </div>
      <BoxBody>
        {this.props.task.description}
      </BoxBody>
      <BoxFooter>{this.renderUsers(this.props.task.users)}</BoxFooter>
    </Box>}
    </div>
  );
}
}

export default DragSource('card', cardSource, collect)(Card);
