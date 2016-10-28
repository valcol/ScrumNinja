import React, { Component } from 'react';
import Breadcrumbs from 'react-router-breadcrumbs';

export class ContentWrapper extends Component {

  render() {
    return (
      <div className="content-wrapper">
              {/* Content Header (Page header) */}
              <section className="content-header">
                <h1>
                  Title
                </h1>
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
