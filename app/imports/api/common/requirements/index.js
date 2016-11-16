import { Meteor } from 'meteor/meteor';
import { Collections } from '../../common/collections.js';
import PermissionsHelper from '../../common/permissionsHelper.js';

let Requirement = function() {};

Requirement.prototype.add = function(requirement,categorie, projectName) {
  PermissionsHelper.checkIfLogged();
  PermissionsHelper.verify(Meteor.userId(), projectName, 'pa');


  if (requirement.id === 0){
    let requirements = Collections.Requirements.find({project: projectName}, {sort: {id: -1}}).fetch();
    requirement.id = (requirements.length > 0) ? requirements[0].id+1 : 1;
  }

  requirement.categorie = categorie;
  requirement.project = projectName;

  Collections.Requirements.insert(requirement);

   return 'Requirement created';
};

Requirement.prototype.delete = function(_id){
  PermissionsHelper.checkIfLogged();
 // PermissionsHelper.verify(Meteor.userId(), projectName, 'pa');

  Collections.Requirements.remove({
    _id
  });

   return 'Requirement deleted';
};

export default new Requirement();
