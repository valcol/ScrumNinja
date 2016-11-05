import { Collections } from './lib/collections.js';

let PermissionsHelper = function() {};

PermissionsHelper.prototype.verifyRole = function(userId, projectName, role) {
  return !!Collections.Projects.find({name:projectName}, {['roles.'+userId]:role});
};

export default new PermissionsHelper();
