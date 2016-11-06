import React, {Component} from 'react';

on = (type) => Array.isArray(type) ? type : [type];
const lastOf = (input) => on(input).slice(-1)[0];

class RouteName extends Component {
  render() {
    return (
      <h1>
        {lastOf(this.props.routes.slice(0, 2)).name}
      </h1>
    );
  }
}

export default RouteName;
