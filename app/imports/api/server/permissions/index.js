import { Meteor } from 'meteor/meteor';
import { Collections } from '../../collections.js';
import { check, Match } from 'meteor/check';

let Permissions = function() {};

Permissions.prototype.checkIfLogged = function(){
  if(!Meteor.userId())
    throw new Meteor.Error('authentication error');
};

Permissions.prototype.getPrivilege = function(userId, projectName){
  let project = Collections.Projects.findOne({ name: projectName });
  return project.roles[userId];
};

Permissions.prototype.verify = function(userId, projectName, privilege){
  check(privilege, Match.OneOf('pa', 'pm', 'po'));
  let project = Collections.Projects.findOne({ name: projectName });
  if (!(project.roles[userId]===privilege))
    throw new Meteor.Error('authentication error');
};

Permissions.prototype.upsert = function(userId, projectName, privilege){
  Permissions.verify(Meteor.userId(), projectName, 'pa');
  check(privilege, Match.OneOf('pa', 'pm', 'po'));
  if(Permissions.getPrivilege(userId, projectName)==='pa')
    Permissions.checkIfOneAdmin(projectName);
  let setModifier = { $set: {} };
  setModifier.$set['roles.'+userId] = privilege;
  Collections.Projects.upsert( { name: projectName }, setModifier);
};

Permissions.prototype.checkIfOneAdmin = function(projectName){
  let projet = Collections.Projects.findOne({name: projectName});
  for (let key in projet) {
      if (projet[key] === 'pa') {
          return true;
      }
      throw new Meteor.Error('project need at least one admin');
  }
};

Permissions.prototype.delete = function(userId, projectName){
  Permissions.verify(Meteor.userId(), projectName, 'pa');
  if(Permissions.getPrivilege(userId, projectName)==='pa')
    Permissions.checkIfOneAdmin(projectName);
  let unsetModifier = { $unset: {} };
  unsetModifier.$unset['roles.'+userId] = '';
  Collections.Projects.update( { name: projectName }, unsetModifier);
};

Permissions.prototype.addViaEmail = function(userEmail, projectName, privilege){
  Permissions.verify(Meteor.userId(), projectName, 'pa');
  check(privilege, Match.OneOf('pa', 'pm', 'po'));
  let user = Meteor.users.findOne({'emails.0.address':userEmail});
  if(!user)
    throw new Meteor.Error('user not found');
  let setModifier = { $set: {} };
  setModifier.$set['roles.'+user.userId] = privilege;
  Collections.Projects.upsert( { name: projectName }, setModifier);
};

Permissions = new Permissions();
export default Permissions;
