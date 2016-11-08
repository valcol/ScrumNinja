import { Meteor } from 'meteor/meteor';
import { Collections } from '../../common/collections.js';
import { check, Match } from 'meteor/check';
import PermissionsHelper from '../../common/permissionsHelper.js';

let Requirement = function() {};

Requirement.prototype.add = function(projectName) {

  PermissionsHelper.checkIfLogged();
  PermissionsHelper.verify(Meteor.userId(), projectName, 'pa');

  check(requirement, {
    id: Integer,
    description: String,
    priority : Integer
  });

 /* if(Collections.Requirements.findOne({id: requirements.id}))
    throw new Meteor.Error('id already taken');*/

  Collections.Projects.insert({
    id: requirement.id,
    description: requirement.description,
    priority : requirement.priority
  });

   return 'Requirement created';
};

Requirement.prototype.delete = function(projectName){

  PermissionsHelper.checkIfLogged();

  PermissionsHelper.verify(Meteor.userId(), projectName, 'pa');

  Collections.Requirements.remove({
    id: 0
  });

   return 'Requirement deleted';
};

export default new Requirement();
