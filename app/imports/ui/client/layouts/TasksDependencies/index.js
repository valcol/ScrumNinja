import React, {Component} from 'react';
import TasksManagementBox from '../../components/TasksManagement';

class TasksDependencies extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="TasksDependencies">
        <TasksManagementBox {...this.props}/>
      </div>
    );
  }
}

export default TasksDependencies;
