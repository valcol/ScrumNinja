import { Meteor } from 'meteor/meteor';
import Projects from './projects';
import Permissions from './permissions';
import Specifications from './specifications';

Meteor.startup(() => {
  // code to run on server at startup
});

Meteor.methods({
  'project.create': Projects.create,
  'project.delete': Projects.delete,
  'permission.upsert': Permissions.upsert,
  'permission.delete': Permissions.delete,
  'permission.addViaEmail': Permissions.addViaEmail,
  'specifications.delete': Specifications.delete
});
