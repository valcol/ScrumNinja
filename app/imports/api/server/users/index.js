import { Meteor } from 'meteor/meteor';
import { check, Match } from 'meteor/check';
import PermissionsHelper from '../../common/permissionsHelper.js';

let Users = function() {};

Users.prototype.updateEmail = function(email) {

  PermissionsHelper.checkIfLogged();
  check(email, String);

  let re = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
  if (!re.test(email))
    throw new Meteor.Error('incorrect email');

  Meteor.users.update({_id:Meteor.userId()}, {$set: {'emails.0.address': email}});

  return 'Email updated';
};

Users.prototype.updateUsername = function(username){

  PermissionsHelper.checkIfLogged();
  check(username, String);

  Meteor.users.update({_id:Meteor.userId()}, {$set: {username}});

  return 'Username updated';
};

export default new Users();
