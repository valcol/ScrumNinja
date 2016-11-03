import { Collections } from '../collections.js';
import { Meteor } from 'meteor/meteor';

// Publish here
Meteor.publish('projects', function() {
  return Collections.Projects.find({[this.userId]:{$exists : true}});
});

Meteor.publish('public-projects', function() {
  return Collections.Projects.find({visibility: 'public'});
});

Meteor.publish('users', function() {
  return  Meteor.users.find({});
});
