import { Meteor } from 'meteor/meteor';
import { Collections } from '../../common/collections.js';
import PermissionsHelper from '../../common/permissionsHelper.js';

let Requirement = function() {};

Requirement.prototype.add = function(description, priority,
                                    categorie, projectName) {
  PermissionsHelper.checkIfLogged();
  PermissionsHelper.verify(Meteor.userId(), projectName, 'pa');


  Collections.Requirements.insert({
    description,
    priority,
    categorie,
    projectName
  });

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
