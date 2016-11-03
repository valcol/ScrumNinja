import { Meteor } from 'meteor/meteor';
import { Collections } from '../../collections.js';
import { check, Match } from 'meteor/check';

let Permissions = function() {};

Permissions.prototype.checkIfLogged = function(){
  if(!Meteor.userId())
    throw new Meteor.Error('authentication error');
};

Permissions.prototype.getPrivilege = function(userId, projectId){
  let project = Collections.Projects.findOne({ _id: projectId });
  if (project.pa.indexOf()>-1)
    return 'pa';
  else if (project.pm.indexOf()>-1)
    return 'pm';
  else if (project.po.indexOf()>-1)
    return 'po';
};

Permissions.prototype.verify = function(userId, projectId, privilege){
  check(privilege, Match.OneOf('pa', 'pm', 'po'));
  let project = Collections.Projects.findOne({ _id: projectId });
  return (project[privilege].indexOf(userId)>-1);
};

Permissions.prototype.upsertPriviliege = function(userId, projectId, privilege){
  check(privilege, Match.OneOf('pa', 'pm', 'po'));
  Collections.Projects.upsert( { _id: projectId }, { $push: { [privilege]: userId } });
};

export default new Permissions();
