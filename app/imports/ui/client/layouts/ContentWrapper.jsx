import React, { Component } from 'react';
import Breadcrumbs from 'react-router-breadcrumbs';
import {RouteName} from './RouteName.jsx';

export class ContentWrapper extends Component {

  render() {
    return (
      <div className="content-wrapper">
              {/* Content Header (Page header) */}
              <section className="content-header">
                <RouteName routes={this.props.routes}/>
                <ol className="breadcrumb">
                  <Breadcrumbs
                    routes={this.props.routes}
                    params={this.props.params}
                  />
                </ol>
              </section>
              {/* Main content */}
              <section className="content">
            {/* Your Page Content Here */}
            {this.props.children}
          </section>
          {/* /.content */}
        </div>
    );
  }

}
