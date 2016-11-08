import { Meteor } from 'meteor/meteor';
import { Collections } from '../../common/collections.js';
import { check, Match } from 'meteor/check';
import PermissionsHelper from '../../common/permissionsHelper.js';

let Requirement = function() {};

Requirement.prototype.add = function(description, priority, categorie, projectName) {
  let requirement = Collections.Requirements.find({project : projectName});
  PermissionsHelper.checkIfLogged();
  PermissionsHelper.verify(Meteor.userId(), projectName, 'pa');
 

  Collections.Requirements.insert({
    description,
    priority,
    categorie 
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
