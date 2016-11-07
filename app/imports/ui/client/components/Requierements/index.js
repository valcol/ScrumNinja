import React, { Component } from 'react';
import { Session } from 'meteor/session';
import { createContainer } from 'meteor/react-meteor-data';
import { Collections } from '../../../../api/common/collections.js';

import RequierementsList  from './RequierementsList.js';
import FeedbackMessage  from '../misc/FeedbackMessage';
import Box from '../misc/Box';
import BoxHeader from '../misc/BoxHeader';
import BoxBody from '../misc/BoxBody';
import BoxFooter from '../misc/BoxFooter';
import AddRequierementForm from './AddRequierementForm.js';
import Loading from '../misc/Loading';

class RequierementsBox extends Component {

  constructor(props) {
    super(props);
  }

  isVisitorOrPo(){
    let role = this.props.currentProject.roles[Meteor.userId()];
    return (role === 'po' || !role);
  }

  render() {
    return (
      <Box>
        <BoxHeader>
          Requierements
        </BoxHeader>
        {!this.props.loaded ? <BoxBody></BoxBody> :
        <BoxBody>
          <h3>Functional</h3>
          <RequierementsList currentProject={this.props.currentProject}
            requierements={this.props.requierementsF}
            isVisitorOrPo={(this.isVisitorOrPo())}/>
          <h3>Non-functional</h3>
          <RequierementsList currentProject={this.props.currentProject}
            requierements={this.props.requierementsNF}
            isVisitorOrPo={(this.isVisitorOrPo())}/>
          <FeedbackMessage
            error={this.props.error}
            success={this.props.success}
            />
        </BoxBody>
        }
        {!this.isVisitorOrPo() ?
          <BoxFooter>
            <AddRequierementForm currentProject={this.props.currentProject}/>
          </BoxFooter>
          :<div></div>}
        {!this.props.loaded ? <Loading/> : ''}
        </Box>
      );
    }
  }

  export default createContainer((props) => {
    const subscribe = Meteor.subscribe('requierements');
    const requierementsF = Collections.Specifications.find({cat: 'f'}).fetch();
    const requierementsNF = Collections.Specifications.find({cat: 'nf'}).fetch();
    const loaded = !!requierementsF && !!requierementsNF && !!subscribe;
    return {
      error: Session.get('error'),
      success: Session.get('success'),
      loaded,
      requierementsF: loaded ? requierementsF : [],
      requierementsNF: loaded ? requierementsNF : []
    };
  }, RequierementsBox);
