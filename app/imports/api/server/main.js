import { Meteor } from 'meteor/meteor';
import Permissions from './permissions';
import Projects from './projects';
import Users from './users';

Meteor.startup(() => {
  // code to run on server at startup
});

Meteor.methods({
  'permission.upsert': Permissions.upsert,
  'permission.delete': Permissions.delete,
  'permission.addViaEmail': Permissions.addViaEmail,
  'project.create': Projects.create,
  'project.delete': Projects.delete,
  'users.updateEmail': Users.updateEmail,
  'users.updateUsername': Users.updateUsername
});
