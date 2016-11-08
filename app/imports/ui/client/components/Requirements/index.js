import React, { Component } from 'react';
import { Session } from 'meteor/session';
import { createContainer } from 'meteor/react-meteor-data';
import { Collections } from '../../../../api/common/collections.js';

import RequirementsList  from './RequirementsList.js';
import FeedbackMessage  from '../misc/FeedbackMessage';
import Box from '../misc/Box';
import BoxHeader from '../misc/BoxHeader';
import BoxBody from '../misc/BoxBody';
import BoxFooter from '../misc/BoxFooter';
import AddRequirementForm from './AddRequirementForm.js';
import Loading from '../misc/Loading';

class RequirementsBox extends Component {

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
          Requirements
        </BoxHeader>
        {!this.props.loaded ? <BoxBody></BoxBody> :
        <BoxBody>
          <h3>Functional</h3>
          <RequirementsList currentProject={this.props.currentProject}
            requirements={this.props.requirementsF}
            isVisitorOrPo={(this.isVisitorOrPo())}/>
          <h3>Non-functional</h3>
          <RequirementsList currentProject={this.props.currentProject}
            requirements={this.props.requirementsNF}
            isVisitorOrPo={(this.isVisitorOrPo())}/>
          <FeedbackMessage
            error={this.props.error}
            success={this.props.success}
            />
        </BoxBody>
        }
        {!this.isVisitorOrPo() ?
          <BoxFooter>
            <AddRequirementForm currentProject={this.props.currentProject}/>
          </BoxFooter>
          :<div></div>}
        {!this.props.loaded ? <Loading/> : ''}
        </Box>
      );
    }
  }

  export default createContainer((props) => {
    const subscribe = Meteor.subscribe('requirements', props.currentProject.name);
    const requirementsF = Collections.Requirements.find({categorie: 'f'}).fetch();
    const requirementsNF = Collections.Requirements.find({categorie: 'nf'}).fetch();
    const loaded = !!requirementsF && !!requirementsNF && !!subscribe;
    return {
      error: Session.get('error'),
      success: Session.get('success'),
      loaded,
      requirementsF: loaded ? requirementsF : [],
      requirementsNF: loaded ? requirementsNF : []
    };
  }, RequirementsBox);
