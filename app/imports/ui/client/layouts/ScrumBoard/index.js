import React, {Component} from 'react';
import ScrumBoardBox from '../../components/ScrumBoard';

class ScrumBoard extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="ScrumBoard">
        <ScrumBoardBox {...this.props}/>
      </div>
    );
  }
}

export default ScrumBoard;
