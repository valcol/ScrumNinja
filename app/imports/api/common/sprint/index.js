import { Meteor } from 'meteor/meteor';
import { Collections } from '../../common/collections.js';
import PermissionsHelper from '../../common/permissionsHelper.js';

let Sprint = function() {};

Sprint.prototype.add = function(start,end,description,number,userstory,projectName) {
  PermissionsHelper.checkIfLogged();
  PermissionsHelper.verify(Meteor.userId(), projectName, 'pa');


  Collections.Sprints.insert({
    start,
    end,
    description,
    number,
    userstory,
    projectName
  });

   return 'Sprint created';
};

Sprint.prototype.delete = function(_id){
  PermissionsHelper.checkIfLogged();
 // PermissionsHelper.verify(Meteor.userId(), projectName, 'pa');

  Collections.Sprints.remove({
    _id
  });

   return 'Sprint deleted';
};

export default new Sprint();
