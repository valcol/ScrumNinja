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
  return project.roles[userId];
};

Permissions.prototype.verify = function(userId, projectId, privilege){
  check(privilege, Match.OneOf('pa', 'pm', 'po'));
  let project = Collections.Projects.findOne({ _id: projectId });
  if (!(project.roles[userId]===privilege))
    throw new Meteor.Error('authentication error');
};

Permissions.prototype.upsert = function(userId, projectName, privilege){
  check(privilege, Match.OneOf('pa', 'pm', 'po'));
  let setModifier = { $set: {} };
  setModifier.$set['roles.'+userId] = privilege;
  Collections.Projects.upsert( { name: projectName }, setModifier);
};

export default new Permissions();
