import { Meteor } from 'meteor/meteor';
import { Collections } from '../collections.js';
import { check, Match } from 'meteor/check';
import moment from 'moment';
import PermissionsHelper from '../permissionsHelper.js';

let Specifications = function() {};

Specifications.prototype.delete = function(fileId){

  let file = Collections.Specifications.findOne({_id: fileId});

  PermissionsHelper.checkIfLogged();

  if(!PermissionsHelper.verify(Meteor.userId(), file.meta.projectName, 'pa') ||
    !PermissionsHelper.verify(Meteor.userId(), file.meta.projectName, 'po'))
    throw new Meteor.Error('authentication error');


  Collections.Specifications.remove({_id: fileId}, function (error) {
      if (error) {
        throw new Meteor.Error(error.reason);
      } else {
        return 'File successfully removed';
      }
    }
  );
};

export default new Specifications();
