import { Meteor } from 'meteor/meteor';
import { Collections } from '../../collections.js';
import { check, Match } from 'meteor/check';
import moment from 'moment';
import Permissions from '../permissions';

let Specifications = function() {};

Specifications.prototype.delete = function(fileId){

  let file = Collections.Specifications.findOne({_id: fileId});

  Permissions.checkIfLogged();

  Permissions.verify(Meteor.userId(), file.meta.projectName, 'pa');

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
