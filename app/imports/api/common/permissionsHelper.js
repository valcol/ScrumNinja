import { Collections } from './collections.js';

/*
  Roles : 
    - pa : project administrator;
    - pm : project member;
    - po : process owner;
*/

let PermissionsHelper = function() {};

PermissionsHelper.prototype.verify = function(userId, projectName, role) {
  check(role, Match.OneOf('pa', 'pm', 'po'));
  let project = Collections.Projects.findOne({ name: projectName });
  return (project.roles[userId]===role);
};

PermissionsHelper.prototype.isAvailableToView = function(userId, projectName, allowNonMembers) {
  let project = Collections.Projects.findOne({ name: projectName });
  if (project.roles[userId])
    return true;
  else if ((project.visibility==='public'))
    return allowNonMembers;
  return false;
};

PermissionsHelper.prototype.checkIfLogged = function(){
  if(!Meteor.userId())
    throw new Meteor.Error('authentication error');
};



export default new PermissionsHelper();
