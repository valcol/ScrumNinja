import React, { Component } from 'react';
import { Session } from 'meteor/session';

class TraceabilityList extends Component {

  constructor(props) {
    super(props);
  }

  renderRows(){
    return this.props.commits.map((commit) => (
      <tr>
        <td>{commit.userstory}</td>
        <td>{commit.commit}</td>
        <td>{commit.date}</td>
      </tr>
    ));
  }

  render() {
    return (
      <table className="table table-striped">
        <tbody>
          <tr>
            <th style={{width: '55%'}} >
              Task
            </th>
            <th style={{width: '30%'}} >
              commit
            </th>
            <th style={{width: '15%'}} >
              Date
            </th>
          </tr>
          {this.renderRows()}
        </tbody>
      </table>
    );
  }
}

export default TraceabilityList;
