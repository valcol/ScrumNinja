import React, { Component } from 'react';
import Breadcrumbs from 'react-router-breadcrumbs';
import RouteName from '../../components/misc/RouteName';

class ContentWrapper extends Component {

  render() {
    return (
      <div className="content-wrapper">
        <section className="content-header">
          <RouteName routes={this.props.routes}/>
          <ol className="breadcrumb">
            <Breadcrumbs
              routes={this.props.routes}
              params={this.props.params}
              />
          </ol>
        </section>
        <section className="content">
          {this.props.children}
        </section>
      </div>
    );
  }
}

export default ContentWrapper;
