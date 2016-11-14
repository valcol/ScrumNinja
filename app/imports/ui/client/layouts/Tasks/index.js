import React, {Component} from 'react';
import TasksManagementBox from '../../components/TasksManagement';

class TasksManagement extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="UserStories">
        <TasksManagementBox {...this.props}/>
      </div>
    );
  }
}

export default TasksManagement;
