import React, {Component} from 'react';
import TasksDependenciesBox from '../../components/TasksDependencies';

class TasksDependencies extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="TasksDependencies">
        <TasksDependenciesBox {...this.props}/>
      </div>
    );
  }
}

export default TasksDependencies;
