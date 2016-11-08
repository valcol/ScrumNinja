import { Collections } from '../common/collections.js';
import { Meteor } from 'meteor/meteor';

// Publish here
Meteor.publish('projects', function() {
  return Collections.Projects.find({['roles.'+this.userId]:{$exists : true}});
});

Meteor.publish('public-projects', function() {
  return Collections.Projects.find({visibility: 'public'});
});

Meteor.publish('users', function() {
  return  Meteor.users.find({});
});

Meteor.publish('requirements', function() {
  return Collections.Requirements.find().fetch();
});

Collections.Specifications.allowClient();
Meteor.publish('files.specifications.all', function (projectName) {
  return Collections.Specifications.find({'meta.projectName':projectName}).cursor;
});
