import { Collections } from './collections.js';

let PermissionsHelper = function() {};

PermissionsHelper.prototype.verify = function(userId, projectName, role) {
  check(role, Match.OneOf('pa', 'pm', 'po'));
  let project = Collections.Projects.findOne({ name: projectName });
  return (project.roles[userId]===role);
};

PermissionsHelper.prototype.checkIfLogged = function(){
  if(!Meteor.userId())
    throw new Meteor.Error('authentication error');
};

export default new PermissionsHelper();
