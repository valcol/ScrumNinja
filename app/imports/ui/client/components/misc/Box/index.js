import React, { Component } from 'react';

class Box extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
    <div className={this.props.className} style={{height:'100%', position: 'relative'}}>
        {this.props.children}
    </div>
    );
  }
}

Box.propTypes = {
  className: React.PropTypes.string
};

Box.defaultProps = {
  className:'box'
};

export default Box;
