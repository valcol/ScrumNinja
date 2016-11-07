import { Meteor } from 'meteor/meteor';
import { Collections } from '../../common/collections.js';
import { check, Match } from 'meteor/check';
import PermissionsHelper from '../../common/permissionsHelper.js';

let Permissions = function() {};

Permissions.prototype.getPrivilege = function(userId, projectName){
  let project = Collections.Projects.findOne({ name: projectName });
  return project.roles[userId];
};

Permissions.prototype.upsert = function(userId, projectName, privilege){
  PermissionsHelper.checkIfLogged();
  if(!PermissionsHelper.verify(Meteor.userId(), projectName, 'pa'))
    throw new Meteor.Error('authentication error');
  check(privilege, Match.OneOf('pa', 'pm', 'po'));
  if(privilege !== 'pa' && Permissions.getPrivilege(userId, projectName)==='pa')
    Permissions.checkIfOneAdmin(projectName);
  let setModifier = { $set: {} };
  setModifier.$set['roles.'+userId] = privilege;
  Collections.Projects.upsert( { name: projectName }, setModifier);
};

Permissions.prototype.checkIfOneAdmin = function(projectName){
  let projet = Collections.Projects.findOne({name: projectName});
  let nAdmin = 0;
  for (let key in projet.roles) {
      if (projet.roles[key] === 'pa')
          nAdmin++;
  }
  if (nAdmin<2)
    throw new Meteor.Error('project need at least one admin');
};

Permissions.prototype.delete = function(userId, projectName){
  PermissionsHelper.checkIfLogged();
  if(!PermissionsHelper.verify(Meteor.userId(), projectName, 'pa'))
    throw new Meteor.Error('authentication error');
  if(Permissions.getPrivilege(userId, projectName)==='pa')
    Permissions.checkIfOneAdmin(projectName);
  let unsetModifier = { $unset: {} };
  unsetModifier.$unset['roles.'+userId] = '';
  Collections.Projects.update( { name: projectName }, unsetModifier);
};

Permissions.prototype.addViaEmail = function(userEmail, projectName, privilege){
  PermissionsHelper.checkIfLogged();
  if(!PermissionsHelper.verify(Meteor.userId(), projectName, 'pa'))
    throw new Meteor.Error('authentication error');
  check(privilege, Match.OneOf('pa', 'pm', 'po'));
  let user = Meteor.users.findOne({'emails.0.address':userEmail});
  if(!user)
    throw new Meteor.Error('user not found');

  if(Permissions.getPrivilege(user._id, projectName)==='pa')
    Permissions.checkIfOneAdmin(projectName);
  let setModifier = { $set: {} };
  setModifier.$set['roles.'+user._id] = privilege;
  Collections.Projects.upsert( { name: projectName }, setModifier);

 return 'Member added';
};

Permissions = new Permissions();
export default Permissions;
