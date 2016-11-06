import React, { Component } from 'react';
import CreateProjectBox from '../../components/CreateProject';

class CreateProject extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="row">
        {/* left column */}
        <div className="col-md-12">
          <CreateProjectBox/>
        </div>
      </div>
    );
  }
}

export default CreateProject;
